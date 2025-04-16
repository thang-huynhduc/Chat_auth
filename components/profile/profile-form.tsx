"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getAccountInfo, updateAccountInfo } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { profileSchema } from "@/schemas";

type ProfileData = z.infer<typeof profileSchema> & {
  age?: number;
  bmi?: number;
};

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState("profile");

  // Khởi tạo form
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      name: "",
      dateOfBirth: "",
      height: 0,
      weight: 0,
    },
  });

  // Tải thông tin profile từ localStorage hoặc API
  useEffect(() => {
    const fetchProfile = async () => {
      if (status === "loading") return;
      if (status === "unauthenticated") {
        router.push("/auth/login");
        return;
      }

      if (!session?.tokens?.accessToken) {
        setError("Không tìm thấy access token");
        setLoading(false);
        return;
      }

      // Kiểm tra localStorage trước
      const storedProfile = localStorage.getItem("profile");
      if (storedProfile) {
        const profileData = JSON.parse(storedProfile);
        setProfile(profileData);
        form.reset({
          username: session.user.username || "",
          name: profileData.name || "",
          dateOfBirth: profileData.dateOfBirth || "",
          height: profileData.height || 0,
          weight: profileData.weight || 0,
        });
        setLoading(false);
      } else {
        // Chỉ gọi API nếu không có dữ liệu trong localStorage
        setLoading(true);
        setError(null);

        try {
          const response = await getAccountInfo(session.user.username);
          if (response.success && response.data) {
            const profileData = response.data.data || {};
            setProfile(profileData);
            localStorage.setItem("profile", JSON.stringify(profileData));
            form.reset({
              username: session.user.username || "",
              name: profileData.name || "",
              dateOfBirth: profileData.dateOfBirth || "",
              height: profileData.height || 0,
              weight: profileData.weight || 0,
            });
          } else {
            setError(response.error || "Không thể tải thông tin profile");
          }
        } catch (err) {
          setError("Đã xảy ra lỗi khi tải thông tin profile");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [router, form, session, status]);

  // Xử lý cập nhật thông tin
  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      if (!session?.tokens?.accessToken) {
        toast.error("Bạn cần đăng nhập để thực hiện thao tác này");
        return;
      }

      const response = await updateAccountInfo({
        username: values.username,
        name: values.name,
        dateOfBirth: values.dateOfBirth,
        height: values.height,
        weight: values.weight,
      });

      if (response.success) {
        const updatedProfile = {
          ...values,
          age: profile?.age,
          bmi: profile?.bmi,
        };
        setProfile(updatedProfile);
        localStorage.setItem("profile", JSON.stringify(updatedProfile)); // Lưu vào localStorage
        setTabValue("profile");
        toast.success("Cập nhật thông tin thành công");
      } else {
        toast.error(response.error || "Cập nhật thông tin thất bại");
      }
    } catch (err) {
      toast.error("Đã xảy ra lỗi khi cập nhật thông tin");
      console.error(err);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => router.push("/auth/login")}>Quay lại trang đăng nhập</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="edit">Cập nhật thông tin</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>
                Thông tin cá nhân của bạn hiển thị dưới đây
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile ? (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium">Username</h3>
                      <p className="text-base">{session?.user.username || "Chưa cập nhật"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Họ và tên</h3>
                      <p className="text-base">{profile.name || "Chưa cập nhật"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Ngày sinh</h3>
                      <p className="text-base">{profile.dateOfBirth || "Chưa cập nhật"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Tuổi</h3>
                      <p className="text-base">{profile.age || "Chưa cập nhật"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Chiều cao</h3>
                      <p className="text-base">{profile.height ? `${profile.height} cm` : "Chưa cập nhật"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Cân nặng</h3>
                      <p className="text-base">{profile.weight ? `${profile.weight} kg` : "Chưa cập nhật"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Chỉ số BMI</h3>
                      <p className="text-base">{profile.bmi ? profile.bmi.toFixed(1) : "Chưa cập nhật"}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p>Không có thông tin profile</p>
              )}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="flex-1 min-w-[120px]"
                onClick={() => setTabValue("edit")}
              >
                Cập nhật thông tin
              </Button>
              <Button
                variant="outline"
                className="flex-1 min-w-[120px]"
                onClick={() => router.push("/auth/change-password")}
              >
                Đổi mật khẩu
              </Button>
              <Button
                variant="outline"
                className="flex-1 min-w-[120px]"
                onClick={() => router.push("/")}
              >
                Quay về trang chủ
              </Button>
            </CardFooter>

          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Cập nhật thông tin</CardTitle>
              <CardDescription>
                Cập nhật thông tin cá nhân của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ và tên</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập họ và tên" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ngày sinh</FormLabel>
                          <FormControl>
                            <Input placeholder="DD-MM-YYYY" {...field} />
                          </FormControl>
                          <FormDescription>
                            Định dạng: DD-MM-YYYY (ví dụ: 07-06-2004)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chiều cao (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="Nhập chiều cao" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cân nặng (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="Nhập cân nặng" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" type="button" onClick={() => setTabValue("profile")}>
                      Hủy
                    </Button>
                    <Button type="submit">Lưu thay đổi</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Component skeleton cho trạng thái loading
function ProfileSkeleton() {
  return (
    <div className="container max-w-4xl mx-auto p-4">
      <div className="space-y-2 mb-6">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

export default ProfilePage;