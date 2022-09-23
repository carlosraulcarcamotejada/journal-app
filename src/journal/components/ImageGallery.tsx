import { FC } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const ImageGallery: FC = (): JSX.Element => {
  const { active: note = null } = useSelector(
    (state: RootState) => state.journal
  );


  if (!note) return <></>;

  if (note.imagesURLs.length === 0) return <></>;

  const { imagesURLs = [] } = note;


  return (
    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={2}>
      {imagesURLs.map( image => (
        <ImageListItem key={image}>
          <img
            src={image}
            srcSet={image}
            alt={image}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
