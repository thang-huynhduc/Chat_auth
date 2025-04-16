/* eslint-disable @typescript-eslint/no-explicit-any */
// Interface cho response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';

/**
 * Đăng nhập
 */
export async function login(username: string, password: string): Promise<ApiResponse<any>> {
  try {
    if (!username || !password) {
      return { success: false, error: 'Username và password là bắt buộc' };
    }


    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Đăng nhập thất bại' };
  } catch (error) {
    console.error('Login API error:', error);
    return { success: false, error: `Lỗi khi đăng nhập: ${error instanceof Error ? error.message : String(error)}` };
  }
}


/**
 * Đăng xuất
 */
export async function logout(): Promise<ApiResponse<any>> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Đăng xuất thất bại' };
  } catch (error) {
    return { success: false, error: `Lỗi khi đăng xuất: ${error instanceof Error ? error.message : String(error)}` };
  }
}
/**
 * Đăng ký
 */
export async function signUp(username: string, email: string, password: string): Promise<ApiResponse<any>> {
  try {
    if (!username || !email || !password) {
      return { success: false, error: 'Username, email và password là bắt buộc' };
    }
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Đăng ký thất bại' };
  } catch (error) {
    return { success: false, error: `Lỗi khi đăng ký: ${error instanceof Error ? error.message : String(error)}` };
  }
}

/**
 * Làm mới token
 */
export async function refreshToken(refreshToken: string): Promise<ApiResponse<{ accessToken: string }>> {
  try {
    const response = await fetch('/api/auth/refreshToken', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${refreshToken}}` },
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data: { accessToken: data.accessToken } };
    }
    return { success: false, error: data.message || 'Làm mới token thất bại' };
  } catch (error) {
    return { success: false, error: `Lỗi khi làm mới token: ${error instanceof Error ? error.message : String(error)}` };
  }
}

/**
 * Xác thực token
 */
export async function authenticate(accessToken: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch('/api/auth/authentication', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Xác thực thất bại' };
  } catch (error) {
    return { success: false, error: `Lỗi khi xác thực: ${error instanceof Error ? error.message : String(error)}` };
  }
}

/**
 * Gửi OTP
 */
export async function sendOTP(email: string): Promise<ApiResponse<any>> {
  try {
    if (!email) {
      return { success: false, error: 'Email là bắt buộc' };
    }
    const response = await fetch('/api/auth/sendOTP', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Gửi OTP thất bại' };
  } catch (error) {
    return { success: false, error: `Lỗi khi gửi OTP: ${error instanceof Error ? error.message : String(error)}` };
  }
}

/**
 * Xác thực OTP
 */
export async function verifyOTP(email: string, otp: string): Promise<ApiResponse<any>> {
  try {
    if (!email || !otp) {
      return { success: false, error: 'Email và OTP là bắt buộc' };
    }
    const response = await fetch('/api/auth/verifyOTP', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Xác thực OTP thất bại' };
  } catch (error) {
    return { success: false, error: `Lỗi khi xác thực OTP: ${error instanceof Error ? error.message : String(error)}` };
  }
}

/**
 * Đổi mật khẩu
 */
export async function resetPassword(email: string, password: string): Promise<ApiResponse<any>> {
  try {
    if (!email || !password) {
      return { success: false, error: 'Email và mật khẩu mới là bắt buộc' };
    }
    const response = await fetch('/api/auth/resetPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok && data.message === 'Đổi mật khẩu thành công') {
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Đổi mật khẩu thất bại' };
  } catch (error) {
    return {
      success: false,
      error: `Lỗi khi đổi mật khẩu: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Gửi OTP để reset mật khẩu
 */
export async function resetPasswordGetOTP(email: string): Promise<ApiResponse<any>> {
  try {
    if (!email) {
      return { success: false, error: 'Email là bắt buộc' };
    }
    const response = await fetch(`${baseUrl}/api/auth/getOTP`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (response.ok && data.message === 'Đã gửi mã OTP thành công') {
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Gửi OTP reset mật khẩu thất bại' };
  } catch (error) {
    return {
      success: false,
      error: `Lỗi khi gửi OTP reset mật khẩu: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Lấy thông tin tài khoản
 */
export async function getAccountInfo(username: string): Promise<ApiResponse<any>> {
  try {
    if (!username) {
      return { success: false, error: 'Username là bắt buộc' };
    }
    const response = await fetch('/api/auth/getInfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Lấy thông tin tài khoản thất bại' };
  } catch (error) {
    return {
      success: false,
      error: `Lỗi khi lấy thông tin tài khoản: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Cập nhật thông tin tài khoản
 */
export async function updateAccountInfo(info: {
  username: string;
  name?: string;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
}): Promise<ApiResponse<any>> {
  try {
    if (!info.username) {
      return { success: false, error: 'Username là bắt buộc' };
    }
    const response = await fetch('/api/auth/updateInfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Cập nhật thông tin tài khoản thất bại' };
  } catch (error) {
    return {
      success: false,
      error: `Lỗi khi cập nhật thông tin tài khoản: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}