import type { Metadata } from "next";
import { getCommerce } from "@/lib/commerce";
import { QuizFlow } from "@/components/quiz/QuizFlow";

export const metadata: Metadata = {
  title: "Skin Quiz",
  description: "Answer two quick questions and get a personalized Korean skincare routine built for your skin.",
};

export default async function QuizPage() {
  const products = await getCommerce().getProducts();
  return <QuizFlow products={products} />;
}
