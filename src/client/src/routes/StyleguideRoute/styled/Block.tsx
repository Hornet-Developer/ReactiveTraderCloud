import _ from 'lodash'

import { css, Selector, styled } from 'rt-theme'

import { getColor } from '../tools'
import { mapMarginPaddingProps, MarginPaddingProps } from './rules'
import { mapTextProps, TextProps } from './Text'

export interface BlockProps extends TextProps, MarginPaddingProps {
  backgroundColor?: Selector
  textColor?: Selector
  bg?: string
  fg?: string
}

export const Block = styled.div<BlockProps>`
  transition: background-color ease-out 0.15s;

  ${({ theme, backgroundColor, textColor, bg = backgroundColor, fg = textColor }) =>
    css({
      backgroundColor: bg && getColor(theme, bg),
      color: fg && getColor(theme, fg, theme.white),
    })};

  ${mapTextProps};

  ${mapMarginPaddingProps};
`

export default Block
