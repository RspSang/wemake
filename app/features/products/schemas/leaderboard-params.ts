import { z } from 'zod';
import { DateTime } from 'luxon';

const currentYear = DateTime.now().year;

// 공통 연도 스키마: 2000년 ~ 현재 연도
export const yearSchema = z.coerce
  .number()
  .int()
  .min(2000, 'Year must be 2000 or later')
  .max(currentYear, 'Year cannot be in the future');

// 월 스키마: 1~12
export const monthSchema = z.coerce
  .number()
  .int()
  .min(1, 'Month must be between 1 and 12')
  .max(12, 'Month must be between 1 and 12');

// 일 스키마: 1~31
export const daySchema = z.coerce
  .number()
  .int()
  .min(1, 'Day must be between 1 and 31')
  .max(31, 'Day must be between 1 and 31');

// 주차 스키마: 1~53
export const weekSchema = z.coerce
  .number()
  .int()
  .min(1, 'Week must be between 1 and 53')
  .max(53, 'Week must be between 1 and 53');

// Daily params 스키마
export const dailyParamsSchema = z.object({
  year: yearSchema,
  month: monthSchema,
  day: daySchema,
});

// Weekly params 스키마
export const weeklyParamsSchema = z.object({
  year: yearSchema,
  week: weekSchema,
});

// Monthly params 스키마
export const monthlyParamsSchema = z.object({
  year: yearSchema,
  month: monthSchema,
});

// Yearly params 스키마
export const yearlyParamsSchema = z.object({
  year: yearSchema,
});

// 날짜가 미래인지 검증하는 헬퍼 함수
export function validateNotFutureDate(date: DateTime): boolean {
  const today = DateTime.now().setZone('Asia/Seoul').startOf('day');
  return date <= today;
}

// 에러 메시지 상수
export const LEADERBOARD_ERRORS = {
  INVALID_PARAMS: { error_code: 'invalid_params', message: 'Invalid params' },
  INVALID_DATE: { error_code: 'invalid_date', message: 'Invalid date' },
  FUTURE_DATE: { error_code: 'future_date', message: 'Future date not allowed' },
} as const;
