import React, { useContext, useMemo } from 'react'
import { HiArrowSmRight } from 'react-icons/hi'
import { ListContext } from '@/components/lists/ListProvider'
import classNames from "classnames";

const ListItem: React.FC<JSX.IntrinsicElements['li']> = props => {
  const { children, className = '', ...rest } = props
  const { type } = useContext(ListContext)

  const childArr = useMemo(() => React.Children.map(children, child => child), [children])

  const getMarker = {
    ul: () => (
      <span className="flex pt-[4px] pr-2">
        <HiArrowSmRight className="text-xl -ml-1 mr-1 text-primary" />
      </span>
    ),
    // ol 的 marker 样式在 markdown.scss 中设置
    ol: () => null,
    tl: () => (
      <span className="flex pt-[5px] pr-2 mr-[2px]">
        {/* @ts-ignore */}
        {childArr[0].props.checked ? (
          <svg width="18" height="18" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-primary" d="M20.9971 11.2638L19.9975 11.2376L19.9975 11.2376L20.9971 11.2638ZM10.7388 20.9986L10.7126 21.9983L10.7388 20.9986ZM1.00398 10.7403L0.00432606 10.7141L1.00398 10.7403ZM11.2623 1.00545L11.2362 2.00511L11.2623 1.00545ZM13.9248 2.4875C14.4472 2.66673 15.016 2.38854 15.1952 1.86615C15.3744 1.34375 15.0962 0.774974 14.5738 0.595746L13.9248 2.4875ZM21.5796 7.97826C21.4279 7.44721 20.8745 7.13963 20.3434 7.29127C19.8124 7.44291 19.5048 7.99635 19.6565 8.52741L21.5796 7.97826ZM20.7654 2.96752C21.1204 2.54445 21.0653 1.91369 20.6422 1.55869C20.2191 1.20369 19.5884 1.25887 19.2334 1.68195L20.7654 2.96752ZM10.9626 13.0944L10.3198 13.8605C10.5229 14.0309 10.7855 14.1137 11.0497 14.0906C11.3139 14.0675 11.5581 13.9404 11.7286 13.7372L10.9626 13.0944ZM7.64257 9.00322C7.2195 8.64822 6.58874 8.7034 6.23374 9.12648C5.87874 9.54955 5.93392 10.1803 6.357 10.5353L7.64257 9.00322ZM19.9975 11.2376C19.8674 16.2065 15.7338 20.1291 10.765 19.9989L10.7126 21.9983C16.7857 22.1573 21.8378 17.363 21.9968 11.29L19.9975 11.2376ZM10.765 19.9989C5.79611 19.8688 1.87353 15.7353 2.00364 10.7664L0.00432606 10.7141C-0.154702 16.7871 4.63956 21.8392 10.7126 21.9983L10.765 19.9989ZM2.00364 10.7664C2.13375 5.79757 6.26729 1.87499 11.2362 2.00511L11.2885 0.00579091C5.21545 -0.153238 0.163355 4.64103 0.00432606 10.7141L2.00364 10.7664ZM11.2362 2.00511C12.1782 2.02977 13.0809 2.19797 13.9248 2.4875L14.5738 0.595746C13.5399 0.241008 12.4361 0.0358425 11.2885 0.00579091L11.2362 2.00511ZM19.6565 8.52741C19.9014 9.38531 20.0221 10.2955 19.9975 11.2376L21.9968 11.29C22.0268 10.1423 21.8797 9.02937 21.5796 7.97826L19.6565 8.52741ZM19.2334 1.68195L10.1965 12.4516L11.7286 13.7372L20.7654 2.96752L19.2334 1.68195ZM11.6053 12.3284L7.64257 9.00322L6.357 10.5353L10.3198 13.8605L11.6053 12.3284Z" />
          </svg>
          ) : (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="stroke-primary" cx="10" cy="10" r="9" strokeWidth="2" />
          </svg>
        )}
      </span>
    ),
  }[type]

  return (
    <li {...rest} className={classNames(className, 'flex items-start my-4')}>
      {getMarker()}
      <div className="flex-1">{type !== 'tl' ? children : childArr?.slice(2)}</div>
    </li>
  )
}

export default ListItem
