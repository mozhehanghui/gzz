import { Helmet } from 'react-helmet-async'
// @mui
import { useTheme } from '@mui/material/styles'
import { Container, Typography } from '@mui/material'
import styled from 'styled-components/macro'
import ProfileSection from './components/Panel'
import Rahmen from './components/Rahmen2'
import shoujike from 'assets/images/pro/shoujike1.png'
import makebei from 'assets/images/pro/makebei1.png'
import baozhen from 'assets/images/pro/baozhen1.png'
import katao from 'assets/images/pro/gongpai1.png'
import fanbudai from 'assets/images/pro/fanbudai1.png'
import mingxinpian from 'assets/images/pro/mingxinpian1.png'
import { useCallback, useMemo, useState } from 'react'
export interface ImageResultProps {
  id: string
  selected: boolean
  imgUrl: string
  imgDesc: string
}
export interface IPosition {
  width: string
  height: string
  top: string
  left: string
}
export interface IApplication {
  id: string
  templateUrl: string
  resultImageUrl: string
  selected: boolean
  templateDesc: string
  smallShadow: IPosition
  defaultShadow: IPosition
}

export enum ISelectedImageType {
  RESULT = 'result',
  APPLICATION = 'application',
}
export interface ICurrentRehmen {
  type: ISelectedImageType
  imgurl?: string
  sets: any[]
}
export function Preview() {
  const getImgResult = useCallback((arr: any) => {
    if (Array.isArray(arr)) {
      return arr.map((a: any, index: number) => {
        return {
          id: `image${index + 1}`,
          selected: index === 0 ? true : false,
          imgUrl: a,
          imgDesc: `图${index + 1}`,
        }
      })
    }
    return []
  }, [])

  const { text, list } = useMemo(() => {
    const result_images_app = localStorage.getItem('result_images_app')
    try {
      const result = JSON.parse(result_images_app as string)

      const imgResult = getImgResult(result.url ? result.url : [])
      return {
        text: result.text ? result.text : '',
        list: imgResult,
      }
    } catch (error) {
      return {
        text: '',
        list: [],
      }
    }
  }, [getImgResult])

  const [resultText] = useState<string>(text)
  const [imageResults, setImageResults] = useState<ImageResultProps[]>(list)
  const [currentRehmen, setCurrentRehmen] = useState<ICurrentRehmen>({
    type: ISelectedImageType.RESULT,
    sets: imageResults,
  })

  const [applications, setApplications] = useState<IApplication[]>([
    {
      templateUrl: shoujike,
      resultImageUrl: '',
      selected: false,
      templateDesc: '手机壳',
      id: 'shoujike',
      smallShadow: {
        width: '100px',
        height: '100px',
        top: '22px',
        left: '22px',
      },
      defaultShadow: {
        width: '360px',
        height: '360px',
        top: '76px',
        left: '76px',
      },
    },
    {
      templateUrl: makebei,
      resultImageUrl: '',
      selected: false,
      templateDesc: '马克杯',
      id: 'makebei',
      smallShadow: {
        width: '40px',
        height: '40px',
        top: '50px',
        left: '54px',
      },
      defaultShadow: {
        width: '100px',
        height: '100px',
        top: '186px',
        left: '206px',
      },
    },
    {
      templateUrl: baozhen,
      resultImageUrl: '',
      selected: false,
      templateDesc: '定制抱枕',
      id: 'baozhen',
      smallShadow: {
        width: '86px',
        height: '86px',
        top: '28px',
        left: '28px',
      },
      defaultShadow: {
        width: '286px',
        height: '286px',
        top: '112px',
        left: '112px',
      },
    },
    {
      templateUrl: katao,
      resultImageUrl: '',
      selected: false,
      templateDesc: '卡套',
      id: 'katao',
      smallShadow: {
        width: '78px',
        height: '78px',
        top: '46px',
        left: '32px',
      },
      defaultShadow: {
        width: '260px',
        height: '260px',
        top: '162px',
        left: '126px',
      },
    },
    {
      templateUrl: fanbudai,
      resultImageUrl: '',
      selected: false,
      templateDesc: '帆布包',
      id: 'fanbudai',
      smallShadow: {
        width: '46px',
        height: '46px',
        top: '68px',
        left: '48px',
      },
      defaultShadow: {
        width: '136px',
        height: '136px',
        top: '253px',
        left: '186px',
      },
    },
    {
      templateUrl: mingxinpian,
      resultImageUrl: '',
      selected: false,
      templateDesc: '明信片',
      id: 'mingxinpian',
      smallShadow: {
        width: '80px',
        height: '80px',
        top: '22px',
        left: '50px',
      },
      defaultShadow: {
        width: '260px',
        height: '260px',
        top: '86px',
        left: '193px',
      },
    },
  ])

  return (
    <>
      {/* <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet> */}

      <Wrapper>
        <main>
          <article>
            <Rahmen
              imageResults={imageResults}
              applications={applications}
              setImageResults={setImageResults}
              setApplications={setApplications}
              currentRehmen={currentRehmen}
              setCurrentRehmen={setCurrentRehmen}
            />
          </article>
          <aside>
            <ProfileSection
              resultText={resultText}
              currentRehmen={currentRehmen}
              imageResults={imageResults}
              applications={applications}
              setImageResults={setImageResults}
              setApplications={setApplications}
              setCurrentRehmen={setCurrentRehmen}
            />
          </aside>
        </main>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  font-family: 'Exo', Arial, sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  main {
    flex: 1 1 0%;
    min-height: 0;
    display: flex;
    gap: 1px;
  }

  aside {
    min-width: 580px;
    max-width: 580px;
    background-color: #fff;
    overflow-y: auto;
  }

  article {
    flex: 1 1 0%;
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 120px;
  }
`

export default Preview
