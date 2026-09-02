import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const assetName = params.name;

  // 1. Primary check inside public/assets/ (Relative to project root, Vercel compliant)
  const publicPath = path.join(process.cwd(), "public", "assets", assetName);
  if (fs.existsSync(publicPath)) {
    const fileBuffer = fs.readFileSync(publicPath);
    const isPdf = assetName.endsWith(".pdf");
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": isPdf ? "application/pdf" : "image/jpeg",
        "Content-Disposition": isPdf
          ? 'attachment; filename="B_Varun_Sai_Resume.pdf"'
          : "inline",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // 2. Secondary fallback for local Windows absolute paths if running locally
  const LOCAL_FALLBACKS: Record<string, string> = {
    "slide-hero.jpg": "C:\\Users\\varun\\.gemini\\antigravity-ide\\brain\\ac608914-bc47-4a5b-9380-76fff69253ab\\gta_varun_clean_1788374000607.jpg",
    "gta-me-poster.jpg": "C:\\Users\\varun\\.gemini\\antigravity-ide\\brain\\ac608914-bc47-4a5b-9380-76fff69253ab\\gta_varun_clean_1788374000607.jpg",
    "slide-about.jpg": "C:\\Users\\varun\\.gemini\\antigravity-ide\\brain\\ac608914-bc47-4a5b-9380-76fff69253ab\\gta_slide_about_1788374840380.jpg",
    "slide-skills.jpg": "C:\\Users\\varun\\.gemini\\antigravity-ide\\brain\\ac608914-bc47-4a5b-9380-76fff69253ab\\gta_slide_skills_1788375186335.jpg",
    "slide-projects.jpg": "C:\\Users\\varun\\.gemini\\antigravity-ide\\brain\\ac608914-bc47-4a5b-9380-76fff69253ab\\gta_slide_projects_1788375207848.jpg",
    "slide-experience.jpg": "C:\\Users\\varun\\.gemini\\antigravity-ide\\brain\\ac608914-bc47-4a5b-9380-76fff69253ab\\gta_slide_experience_1788375228052.jpg",
    "slide-achievements.jpg": "C:\\Users\\varun\\.gemini\\antigravity-ide\\brain\\ac608914-bc47-4a5b-9380-76fff69253ab\\gta_slide_achievements_1788375249433.jpg",
    "slide-contact.jpg": "C:\\Users\\varun\\.gemini\\antigravity-ide\\brain\\ac608914-bc47-4a5b-9380-76fff69253ab\\gta_slide_contact_1788375270528.jpg",
    "B_Varun_Sai_Resume.pdf": "C:\\Users\\varun\\.gemini\\antigravity-ide\\brain\\ac608914-bc47-4a5b-9380-76fff69253ab\\.user_uploaded\\media_1788377848963.pdf",
    "resume.pdf": "C:\\Users\\varun\\.gemini\\antigravity-ide\\brain\\ac608914-bc47-4a5b-9380-76fff69253ab\\.user_uploaded\\media_1788377848963.pdf"
  };

  const localPath = LOCAL_FALLBACKS[assetName];
  if (localPath && fs.existsSync(localPath)) {
    const fileBuffer = fs.readFileSync(localPath);
    const isPdf = assetName.endsWith(".pdf");
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": isPdf ? "application/pdf" : "image/jpeg",
        "Content-Disposition": isPdf
          ? 'attachment; filename="B_Varun_Sai_Resume.pdf"'
          : "inline",
      },
    });
  }

  return new NextResponse("Not Found", { status: 404 });
}
