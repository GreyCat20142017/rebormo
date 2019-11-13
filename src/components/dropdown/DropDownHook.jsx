import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';

import {DROPDOWN_TYPE, KEYCODES} from '../../constants';
import {getInlineSvg} from '../../sprite';
import {NavItem} from '../header/NavItem';

const getIcon = (link) => (
    link['icon'] ?
        <span>{getInlineSvg(link['icon'], 18, 18, 'grey', 'grey')}&nbsp;&nbsp;</span> :
        null
);

const LinkDrop = ({link, css, clickHandler}) => (
    <a className={css.linkCss}
       href={link.href} onClick={clickHandler}
       key={link.key}>
        {getIcon(link)}
        {link.text}
    </a>
);

const ButtonDrop = ({link, css, clickHandler}) => {
    return (
        <button className={css.linkCss}
                type='button' onClick={() => clickHandler(link.key)}
                key={link.key}>
            {getIcon(link)}
            {link.text}
        </button>
    );
};

const NavLinkDrop = ({link}) => (
    <NavItem {...link}/>
);

const getItemComponent = (type) => {
    switch (type) {
        case DROPDOWN_TYPE.LINK:
            return ButtonDrop;
        case DROPDOWN_TYPE.NAVLINK:
            return NavLinkDrop;
        default:
    }
    return LinkDrop;
};

/**
 * для передачи в props DropDown нужно подготовить массив объектов вида
 * {key: 'key', link: 'link', text: 'text', icon: 'icon'}
 * Icon - необязательно.
 */
const DropDown = ({
                      data = [], togglerText = 'перейти...', ariaInfo = 'dropdown', dropdownSet = [],
                      callback = null, linkType = DROPDOWN_TYPE.LINK, returnKey = false,
                      css = {
                          togglerCss: 'btn dropdown-toggle btn-block',
                          linkCss: 'dropdown-item w-100'
                      }
                  }) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleContainer = useRef(null);
    const dropOpenedClass = isOpen ? ' show ' : '';
    const links = Array.isArray(data) ? data : [];
    const ItemComponent = getItemComponent(linkType);
    let timeOutId = null;

    useEffect(() => {
        document.addEventListener('click', onClickOutsideHandler);
        document.addEventListener('keydown', onKeyPress);
        return () => {
            document.removeEventListener('click', onClickOutsideHandler);
            document.removeEventListener('keydown', onKeyPress);
        };
    });

    const onClickHandler = () => setIsOpen(!isOpen);

    const onButtonClickHandler = (key) => {
        if (callback) {
            setIsOpen(false);
            callback(returnKey ? key : dropdownSet[key]);
        }
    };

    const onClickOutsideHandler = (evt) => {
        if (isOpen && toggleContainer.current.contains(evt.target)) {
            setIsOpen(false);
        }
    };

    const onBlurHandler = () => {
        timeOutId = setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };

    const onKeyPress = (evt) => {
        if (evt.keyCode === KEYCODES.ESC) {
            evt.preventDefault();
            setIsOpen(false);
        }
    };

    const onFocusHandler = () => {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }
    };

    return (
        <div className='dropdown mt-1 p-1' ref={toggleContainer} onBlur={onBlurHandler}
             onFocus={onFocusHandler}>
            <button className={css.togglerCss} type='button'
                    id={ariaInfo}
                    data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' onClick={onClickHandler}>
                {togglerText}
            </button>
            <div className={classNames('dropdown-menu w-100 ', dropOpenedClass, css.wrapperCss || '')}
                 aria-labelledby={ariaInfo}>
                {links.map((link, ind) =>
                    <ItemComponent key={ind} link={link} css={css} clickHandler={onButtonClickHandler}/>
                )}
            </div>
        </div>
    );
};

export default DropDown;
