import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Icon, IconType } from "../icon";
import { CardCarouselItem } from "./CardCarouselItem";
import { CardCarouselNavigationButton } from "./CardCarouselNavigationButton";

export interface CardCarouselProps {
  children: React.ReactNode;
  icon: IconType;
  title: string;
}

export const CardCarousel = ({ children, icon, title }: CardCarouselProps) => (
  <Card
    sx={{
      ".io-ipatente-hidden": {
        display: "none",
      },
    }}
  >
    <CardHeader
      action={
        <>
          <CardCarouselNavigationButton
            aria-label="button-prev-slide"
            className="io-ipatente-swiper-button-prev"
            icon="arrowCircleLeftBold"
          />
          <CardCarouselNavigationButton
            aria-label="button-next-slide"
            className="io-ipatente-swiper-button-next"
            icon="arrowCircleRightBold"
          />
        </>
      }
      avatar={<Icon fontSize="medium" name={icon} />}
      disableTypography
      title={
        <Typography fontSize={20} fontWeight={600}>
          {title}
        </Typography>
      }
    />
    <CardContent sx={{ p: 2, pt: 0 }}>
      <Stack
        sx={{
          "& .swiper": {
            height: "100%",
            width: "100%",
          },
          ".swiper-slide": {
            height: "auto",
          },
        }}
      >
        <Swiper
          className="io-ipatente-swiper"
          modules={[Pagination, Navigation]}
          navigation={{
            disabledClass: "Mui-disabled",
            lockClass: "io-ipatente-hidden",
            nextEl: ".io-ipatente-swiper-button-next",
            prevEl: ".io-ipatente-swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".io-ipatente-swiper-pagination",
          }}
          spaceBetween={30}
        >
          {/* workaround because swiper needs SwiperSlide as direct children */}
          {React.Children.map(children, (child: React.ReactNode, index) => (
            <SwiperSlide key={`slide-${index}`}>{child}</SwiperSlide>
          ))}
        </Swiper>
      </Stack>
      <Box
        className="io-ipatente-swiper-pagination"
        component="div"
        display="flex"
        justifyContent="center"
        paddingTop={2}
        sx={{
          "& .swiper-pagination-bullet-active": {
            backgroundColor: "primary.main",
            borderRadius: 4,
            width: 30,
          },
        }}
      />
    </CardContent>
  </Card>
);

// namespace
CardCarousel.Item = CardCarouselItem;
