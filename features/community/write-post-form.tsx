import { ImagePlus, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { boardCategories } from "@/constants/navigation";

export function WritePostForm() {
  return (
    <Card className="p-5 md:p-8">
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-black text-white">제목</span>
          <input
            className="h-12 rounded-xl border border-white/10 bg-white/8 px-4 text-white outline-none transition placeholder:text-white/34 focus:border-primary"
            placeholder="제목을 입력하세요"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-black text-white">카테고리</span>
          <select className="h-12 rounded-xl border border-white/10 bg-white/8 px-4 text-white outline-none transition focus:border-primary">
            {boardCategories.map((category) => (
              <option key={category.value}>{category.label}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-black text-white">본문</span>
          <textarea
            className="min-h-80 rounded-xl border border-white/10 bg-white/8 p-4 leading-7 text-white outline-none transition placeholder:text-white/34 focus:border-primary"
            placeholder="공략, 질문, 버그 제보, 팬아트 설명 등을 자유롭게 작성하세요."
          />
        </label>
        <div className="grid gap-2">
          <span className="text-sm font-black text-white">이미지 업로드</span>
          <button className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-white/18 bg-white/[0.04] text-sm font-bold text-white/54 transition hover:border-primary hover:text-primary">
            <ImagePlus className="mr-2 h-5 w-5" />
            이미지를 드래그하거나 선택하세요
          </button>
        </div>
        <label className="grid gap-2">
          <span className="text-sm font-black text-white">태그</span>
          <input
            className="h-12 rounded-xl border border-white/10 bg-white/8 px-4 text-white outline-none transition placeholder:text-white/34 focus:border-primary"
            placeholder="#공략 #피드백 #버그"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary">
            <Save className="h-4 w-4" />
            임시저장
          </Button>
          <Button>
            <Send className="h-4 w-4" />
            등록
          </Button>
        </div>
      </div>
    </Card>
  );
}
