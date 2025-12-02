import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as kv from "./kv_store";
import { createClient } from "@supabase/supabase-js";
import { serve } from "@hono/node-server";

const app = new Hono();

// Supabase client for Node environment
const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
);

// Middleware
app.use("*", logger());
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

const BUCKET_NAME = "make-89810f19-article-thumbnails";

// Initialize bucket
async function initializeBucket() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some((bucket) => bucket.name === BUCKET_NAME);

    if (!exists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 5242880,
      });
      console.log("Bucket created:", BUCKET_NAME);
    }
  } catch (error: any) {
    console.error("Bucket initialize error:", error.message);
  }
}

initializeBucket();

// Health
app.get("/health", (c) => c.json({ status: "ok" }));

// Upload thumbnail
app.post("/upload-thumbnail", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return c.json({ error: "File missing or invalid" }, 400);
    }

    const filename = `${Date.now()}-${Math.random().toString(36).slice(7)}.${file.name.split(".").pop()}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = await supabase.storage.from(BUCKET_NAME).createSignedUrl(filename, 31536000);

    return c.json({ success: true, url: data?.signedUrl, filename });
  } catch (error: any) {
    console.error("Upload error:", error);
    return c.json({ error: error.message }, 500);
  }
});

export default app;