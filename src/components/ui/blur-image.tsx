"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState, forwardRef } from "react";

/**
 * BlurImage
 *
 * A wrapper around Next.js's Image component with added functionality to show a blur effect
 * while the image is loading. Once the image is fully loaded, the blur effect is removed.
 *
 * Props:
 * - image: URL of the image to be loaded.
 * - aspectRatio: Sets the aspect ratio for the image container using TailwindCSS.
 * - grayscale: A boolean to decide if the grayscale effect should be applied.
 * - className: Additional classes passed to the component.
 * - alt: Image description for accessibility purposes.
 * - renderWrapperDiv: Allows client to customize parent wrapper
 *
 * Resources:
 * - TailwindCSS aspect ratio: https://design2tailwind.com/blog/use-aspect-ratio-plugin-tailwindcss/
 * - How to set up blur images: https://www.dhairyashah.dev/posts/how-to-blur-image-on-load-in-nextjs/
 **/

type BlurImageProps = {
  aspectRatio?: string;
  grayscale?: boolean;
  renderWrapperDiv?: (content: React.ReactNode) => React.ReactNode;
  containerStyles?: string;
} & ImageProps;

export const BlurImage = forwardRef<HTMLImageElement, BlurImageProps>(
  (
    {
      src,
      aspectRatio = "aspect-h-1 aspect-w-1 xl:aspect-h-7 xl:aspect-w-8",
      grayscale = false,
      className = "",
      containerStyles,
      alt = "",
      renderWrapperDiv = null,
      sizes = undefined,
      ...props
    },
    ref
  ) => {
    const [isLoading, setLoading] = useState(true);

    const renderImage = (
      <Image
        alt={alt}
        src={src}
        priority
        className={cn(
          "object-cover",
          "duration-700",
          "ease-in-out",
          "group-hover:opacity-75",
          className,
          isLoading ? "scale-110 blur-2xl" : "scale-100 blur-0 grayscale-0",
          grayscale && isLoading ? "grayscale" : ""
        )}
        onLoadingComplete={() => setLoading(false)}
        ref={ref}
        sizes={sizes}
        {...props}
      />
    );

    if (renderWrapperDiv) {
      return renderWrapperDiv(renderImage);
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full overflow-hidden bg-gray-100",
          aspectRatio,
          containerStyles
        )}
      >
        {renderImage}
      </div>
    );
  }
);

BlurImage.displayName = "BlurImage";
