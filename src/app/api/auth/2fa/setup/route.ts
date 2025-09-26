import { TWO_FACTOR_CONFIG } from "@/lib/auth/config";
import { authOptions } from "@/lib/auth/nextauth";
import { generateBackupCodes, hashBackupCodes } from "@/lib/auth/security";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authenticator } from "otplib";
import QRCode from "qrcode";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate secret for TOTP
    const secret = authenticator.generateSecret();

    // Create the key URI for QR code
    const keyUri = authenticator.keyuri(session.user.email!, TWO_FACTOR_CONFIG.issuer, secret);

    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(keyUri);

    // Generate backup codes
    const backupCodes = generateBackupCodes(TWO_FACTOR_CONFIG.backupCodesCount);
    const hashedBackupCodes = await hashBackupCodes(backupCodes);

    // Store temporary 2FA data (we'll activate it when user verifies)
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        twoFactorSecret: secret, // This will be activated after verification
        backupCodes: hashedBackupCodes,
      },
    });

    return NextResponse.json({
      secret,
      qrCode: qrCodeDataURL,
      backupCodes, // Send plain codes to user (they should save them)
      manualEntryKey: secret, // For manual entry if QR doesn't work
    });
  } catch (error) {
    console.error("2FA setup error:", error);
    return NextResponse.json({ error: "Failed to setup 2FA" }, { status: 500 });
  }
}
