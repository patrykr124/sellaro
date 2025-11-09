import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { product_type } from "./type";

interface RecommendationProductsProps {
  products: product_type[];
}

export default function Recommendation_products({
  products,
}: RecommendationProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }
console.log(products)
  return (
    <Carousel className="w-full bg-background-gray">
      <CarouselContent className="-ml-1">
        {products.map((item) => {
          return (
            <CarouselItem key={item.id} className="pl-1 basis-1/2">
              <div className="p-1">
                <Card className="">
                  <CardContent className="flex relative h-[180px] aspect-square items-center justify-center">
                   
                      <Image
                        src={item.image}
                        fill
                        alt={item.name}
                        objectFit="contain"
                      />
                   
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
