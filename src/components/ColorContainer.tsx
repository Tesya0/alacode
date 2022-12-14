import styled, { css } from 'styled-components';
import { color } from '../style/color';
import { breakpoints, mqMin } from '../style/mq';
import { vwRange } from '../style/vw';

type Props = {
  children: React.ReactNode,
  page: string,
  color?: string,
  curtain?: boolean,
};

const Wrapper = styled.div<Props>`
  width: 100%;
  ${mqMin(breakpoints.sm)} {
    margin-bottom: 120px;
  }
  ${(props) => props.page === 'items' ? css`
    height: 480px;
    ${mqMin(breakpoints.sm)} {
      ${vwRange('height', 480, 680, 560, 960)}
    }
    ${mqMin(breakpoints.md)} {
      height: 680px;
    }
    ` : props.page === 'contact' ? css`
    /* height: 1020px; */
    ${mqMin(breakpoints.md)} {
      /* height: 1050px; */
    };
  ` : ''
  }
  .container {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: ${({ color }) => color};
    ${({ page }) => page === 'contact' ? css`
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      height: 100%;
    ` : ''}
  }
`;
const Light = styled.div`
  content: '';
  display: none;
  position: absolute;
  top: -50%;
  left: -50%;
  z-index: 1;
  width: 200%;
  height: 200%;
  background: ${({ color }) => color};
  opacity: 0;
  transition: 0.3s opacity ease-in-out;
  mix-blend-mode: screen;
  filter: blur(10px);
`
const Curtain = styled.div`
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: ${color.grayEclipse};
  ${mqMin(breakpoints.sm)} {
    height: 50%;
  }
`

export const ColorContainer: React.FC<Props> = ({ children, page, color, curtain }) => {
  return (
    <Wrapper page={page} color={color}>
      <div id={`${page}-container`} className="container">
        <Light className="light" color={color} />
        {curtain ? <Curtain className="curtain" /> : ''}
        {children}
      </div>
    </Wrapper>
  )
};