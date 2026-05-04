import { supabase } from "@/lib/supabase";
import { uploadImage } from "./image";
import type { PostEntity } from "@/types";

export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
    })
    .select()
    .single();
  // supabase 테이블에 아이템을 추가하고 반환값을 받기위해서는 select와single 메서드를 사용해줘야함

  if (error) throw error;
  return data;
}

export async function createPostWithImages({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}) {
  // 1. 포스트 생성
  const post = await createPost(content);
  if (images.length === 0) return post;

  // 2. (스토리지에)이미지 업로드
  const imageUrls = await Promise.all(
    images.map((image) => {
      const fileExtension = image.name.split(".").pop() || "webp";
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
      const filePath = `${userId}/${post.id}/${fileName}`;

      return uploadImage({
        file: image,
        filePath,
      });
    }),
  );

  // 3. 포스트 테이블
}

export async function updatePost(post: Partial<PostEntity> & { id: number }) {}
