export enum ActivityTopic {
  All = 'all',
  Password = 'password',
  Session = 'session',
  OTP = 'otp',
}

export enum ActivityResult {
  Succeed = 'succeed',
  Failed = 'failed',
  Denied = 'denied',
}

export interface Activity {
  id: number
  user_ip: string
  user_ip_country: string
  user_agent: string
  topic: ActivityTopic
  action: string
  result: ActivityResult
  data: null
  created_at: string
}
