-- Authentication System Migration for Supabase
-- Run this SQL in your Supabase SQL editor to add the new authentication fields

-- Add new columns to the User table for 2FA and security features
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "twoFactorSecret" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "backupCodes" TEXT[] DEFAULT '{}';
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "loginAttempts" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "lockedUntil" TIMESTAMP(3);

-- Update existing users to have the new default values if columns already exist
UPDATE "User" SET
  "loginAttempts" = 0
WHERE "loginAttempts" IS NULL;

UPDATE "User" SET
  "backupCodes" = '{}'
WHERE "backupCodes" IS NULL;

-- Create indexes for performance on frequently queried fields
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
CREATE INDEX IF NOT EXISTS "User_status_idx" ON "User"("status");
CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"("role");
CREATE INDEX IF NOT EXISTS "User_twoFactorEnabled_idx" ON "User"("twoFactorEnabled");

-- Create indexes for session management
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE INDEX IF NOT EXISTS "Session_sessionToken_idx" ON "Session"("sessionToken");
CREATE INDEX IF NOT EXISTS "Session_expires_idx" ON "Session"("expires");

-- Create indexes for account management
CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account"("userId");
CREATE INDEX IF NOT EXISTS "Account_provider_providerAccountId_idx" ON "Account"("provider", "providerAccountId");

-- Create indexes for verification tokens
CREATE INDEX IF NOT EXISTS "VerificationToken_identifier_idx" ON "VerificationToken"("identifier");
CREATE INDEX IF NOT EXISTS "VerificationToken_token_idx" ON "VerificationToken"("token");

-- Add comments to document the new fields
COMMENT ON COLUMN "User"."twoFactorSecret" IS 'TOTP secret for two-factor authentication (encrypted)';
COMMENT ON COLUMN "User"."backupCodes" IS 'Array of hashed backup codes for 2FA recovery';
COMMENT ON COLUMN "User"."loginAttempts" IS 'Counter for failed login attempts (for rate limiting)';
COMMENT ON COLUMN "User"."lockedUntil" IS 'Timestamp until when the account is locked due to failed attempts';

-- Verify the migration completed successfully
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'User'
  AND column_name IN ('twoFactorSecret', 'backupCodes', 'loginAttempts', 'lockedUntil')
ORDER BY column_name;