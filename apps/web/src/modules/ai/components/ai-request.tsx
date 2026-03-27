import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AudienceEnum,
  EmotionEnum,
  LanguageEnum,
  LengthEnum,
  ToneEnum,
} from "../schemas/airequest.schema";
import { Form } from "@/components/ui/form";
import FormTextarea from "@/components/ui/form-textarea";
import FormSelect from "@/components/ui/form-select";
import PrimaryButton from "@/components/ui/primary-button";
import { aiRequest, AIRequest } from "../schemas/airequest.schema";
import { useGenerateAI } from "../hooks/use-ai";
import { useAIStore } from "../stores/ai.store";

const enumToOptions = (e: Record<string, string>) =>
  Object.values(e).map((v) => ({ label: v, value: v }));

const languageOptions = enumToOptions(LanguageEnum);
const toneOptions = enumToOptions(ToneEnum);
const lengthOptions = enumToOptions(LengthEnum);
const audienceOptions = enumToOptions(AudienceEnum);
const emotionOptions = enumToOptions(EmotionEnum);

export default function AiRequest() {
  const form = useForm<AIRequest>({
    resolver: zodResolver(aiRequest),
    defaultValues: {
      languages: LanguageEnum.ENGLISH,
      tone: ToneEnum.NORMAL,
      length: LengthEnum.MEDIUM,
      audience: AudienceEnum.GENERAL,
      emotion: EmotionEnum.NEUTRAL,
      instructions: "",
      notFollowInstruction: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { mutate, isPending } = useGenerateAI();
  const content = useAIStore((state) => state.content);

  const onSubmit = (data: AIRequest) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    if (content) {
      formData.append("previousResponse", content);
    }

    mutate(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full overflow-y-auto p-4 space-y-4
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-indigo-800/50
          [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        <FormTextarea
          control={form.control}
          name="instructions"
          lable="Instructions"
          placeholder="Enter generate instructions..."
          disabled={isPending}
        />

        <FormTextarea
          control={form.control}
          name="notFollowInstruction"
          lable="Not Follow Instruction"
          placeholder="Enter content to avoid..."
          required={false}
          disabled={isPending}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            control={form.control}
            name="languages"
            lable="Language"
            options={languageOptions}
          />
          <FormSelect
            control={form.control}
            name="tone"
            lable="Tone"
            options={toneOptions}
          />
          <FormSelect
            control={form.control}
            name="length"
            lable="Length"
            options={lengthOptions}
          />
          <FormSelect
            control={form.control}
            name="audience"
            lable="Audience"
            options={audienceOptions}
          />
          <FormSelect
            control={form.control}
            name="emotion"
            lable="Emotion"
            options={emotionOptions}
          />
        </div>

        <PrimaryButton
          type="submit"
          disabled={isPending}
          className="sticky bottom-2 w-full bg-indigo-600/90 hover:bg-indigo-500
          border border-indigo-500/40 text-white transition-all"
        >
          {isPending ? "Generating..." : "Generate"}
        </PrimaryButton>
      </form>
    </Form>
  );
}
