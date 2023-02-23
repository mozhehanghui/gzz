import React, { useMemo, useCallback } from 'react'
import { ImageList, ImageListItem } from '@mui/material'

import { imageItem } from '..'

export default function MasonryImageList({
  imageList,
  setCurImage,
}: {
  imageList: imageItem[]
  setCurImage: (url: string) => void
}) {
  const getCurImage = React.useCallback(
    (url: string) => () => {
      setCurImage && setCurImage(url)
    },
    [setCurImage],
  )

  const firstList = useMemo(() => {
    const newList = [...imageList]
    const right20 = newList.splice(20)
    const result = right20.concat(newList)
    return result
  }, [imageList])

  const secondList = useMemo(() => {
    const newList = [...imageList]
    const result = newList.reverse()
    return result
  }, [imageList])

  const getImageListItem = useCallback(
    (item: imageItem) => {
      return (
        <ImageListItem key={item.img}>
          <img
            key={item.img}
            onClick={getCurImage(item.img)}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            style={{
              borderRadius: '12px',
              cursor: 'pointer',
              height: '13.88vw',
              width: '13.88vw',
            }}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      )
    },
    [getCurImage],
  )

  return (
    <div className="listWrapper">
      <ImageList
        className="firstLine"
        variant="masonry"
        key="left"
        cols={1}
        gap={16}
      >
        {firstList.map(item => {
          return getImageListItem(item)
        })}
      </ImageList>

      <ImageList
        className="secondLine"
        variant="masonry"
        key="middle"
        cols={1}
        gap={16}
      >
        {secondList.map(item => {
          return getImageListItem(item)
        })}
      </ImageList>

      <ImageList
        className="thirdLine"
        variant="masonry"
        key="right"
        cols={1}
        gap={16}
      >
        {imageList.map(item => {
          return getImageListItem(item)
        })}
      </ImageList>
    </div>
  )
}
