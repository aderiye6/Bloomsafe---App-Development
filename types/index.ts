export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  SnapChip: undefined;
  History: undefined;
  Profile: undefined;
  Register: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  ResultDetails: { result: TestResult };
  HomeScreen:undefined
};

export const mockUser = {
  id: '4',
  username: null,
  email: 'com.arrikk@gmail.com',
  fullname: 'Bruiz Flash',
  first_name: null,
  last_name: null,
  is_verified: 'no',
  is_active: 'no',
  status: '1',
  created_at: '2023-04-06 21:50:30',
  updated_at: '2023-04-06 21:50:30',
  token: 'VFpybnJHQ0tCczFFdXQ0ZGcyTWM1N25kLzlMUURWbmF2STJ6a1pZNGxLcz0=',
};

export type User = typeof mockUser;

export type TestResult = {
  comment: string;
  date: string;
  id: number;
  image: string;
  latitude: string;
  longitude: string;
  metadata: {
    file: ObjectConstructor[];
    result: number;
    score: number;
    standard: number;
  };
};
