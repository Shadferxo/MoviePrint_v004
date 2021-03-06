// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Icon, Popup, Dropdown, Label, Input } from 'semantic-ui-react';
import { truncate, truncatePath, frameCountToTimeCode, formatBytes } from '../utils/utils';
import styles from './FileList.css';
import transparent from '../img/Thumb_TRANSPARENT.png';
import {
  SHEETVIEW,
} from '../utils/constants';


const FileListElement = ({
  currentFileId,
  currentSheetId,
  fileId,
  fps,
  frameCount,
  fileScanStatus,
  lastModified,
  height,
  name,
  objectUrl,
  onAddIntervalSheetClick,
  onChangeSheetViewClick,
  onDeleteSheetClick,
  onDuplicateSheetClick,
  onExportSheetClick,
  onFileListElementClick,
  onScanMovieListItemClick,
  onReplaceMovieListItemClick,
  onEditTransformListItemClick,
  onRemoveMovieListItem,
  onSetSheetClick,
  path,
  sheetsObject,
  size,
  width,
}) => {
  const sheetsArray = Object.getOwnPropertyNames(sheetsObject);

  function getSheetIcon(sheetView) {
    switch (sheetView) {
      case SHEETVIEW.GRIDVIEW:
        return 'grid layout';
      case SHEETVIEW.TIMELINEVIEW:
        return 'barcode';
      default:
        return 'exclamation';
    }
  }

  function onRemoveMovieListItemClickWithStop(e, fileId) {
    e.stopPropagation();
    onRemoveMovieListItem(fileId);
  }

  function onSheetClickWithStop(e, fileId, sheetId, sheetView) {
    e.stopPropagation();
    onSetSheetClick(fileId, sheetId, sheetView);
  }

  function onChangeSheetViewClickWithStop(e, fileId, sheetId, sheetView) {
    e.stopPropagation();
    onChangeSheetViewClick(fileId, sheetId, sheetView);
  }

  function onDuplicateSheetClickWithStop(e, fileId, sheetId) {
    e.stopPropagation();
    onDuplicateSheetClick(fileId, sheetId);
  }

  function onExportSheetClickWithStop(e, fileId, sheetId) {
    e.stopPropagation();
    onExportSheetClick(fileId, sheetId);
  }

  function onDeleteSheetClickWithStop(e, fileId, sheetId) {
    e.stopPropagation();
    onDeleteSheetClick(fileId, sheetId);
  }

  function onFileListElementClickWithStop(e, fileId) {
    e.stopPropagation();
    onFileListElementClick(fileId);
  }

  function onScanMovieListItemClickWithStop(e, fileId) {
    e.stopPropagation();
    onScanMovieListItemClick(fileId);
  }

  function onAddIntervalSheetClickWithStop(e, fileId) {
    e.stopPropagation();
    onAddIntervalSheetClick(fileId);
  }

  function onEditTransformListItemClickWithStop(e, fileId) {
    e.stopPropagation();
    onEditTransformListItemClick(fileId);
  }

  function onReplaceMovieListItemClickWithStop(e, fileId) {
    e.stopPropagation();
    onReplaceMovieListItemClick(fileId);
  }

  return (
    <li
      data-tid={`fileListItem_${fileId}`}
      onClick={e => onFileListElementClickWithStop(e, fileId)}
      className={`${styles.FileListItem} ${(currentFileId === fileId) ? styles.Highlight : ''} ${(lastModified === undefined) ? styles.Missing : ''}`}
    >
      <Dropdown
        data-tid='movieListItemOptionsDropdown'
        item
        direction="left"
        icon="ellipsis vertical"
        className={`${styles.overflow} ${styles.overflowHidden}`}
      >
        <Dropdown.Menu>
          {lastModified !== undefined &&
              <Dropdown.Item
              data-tid='addShotDetectionMovieListItemOption'
              icon="barcode"
              text="Add MoviePrint (shot detection based)"
              onClick={e => onScanMovieListItemClickWithStop(e, fileId)}
            />
          }
          {lastModified !== undefined &&
            <Dropdown.Item
              data-tid='addIntervalMovieListItemOption'
              icon="grid layout"
              text="Add MoviePrint (interval based)"
              onClick={e => onAddIntervalSheetClickWithStop(e, fileId)}
            />
          }
          <Dropdown.Item
            data-tid='changeCroppingListItemOption'
            icon="crop"
            text="Edit cropping"
            onClick={e => onEditTransformListItemClickWithStop(e, fileId)}
          />
          <Dropdown.Item
            data-tid='replaceMovieListItemOption'
            icon="exchange"
            text="Replace movie"
            onClick={e => onReplaceMovieListItemClickWithStop(e, fileId)}
          />
          <Dropdown.Item
            data-tid='removeMovieListItemOption'
            icon="delete"
            text="Remove from list"
            onClick={e => onRemoveMovieListItemClickWithStop(e, fileId)}
          />
        </Dropdown.Menu>
      </Dropdown>
      <Image
         as='div'
         floated='left'
         className={`${styles.croppedThumb}`}
         style={{
           backgroundColor: '#1e1e1e',
           backgroundImage: `url(${objectUrl})`
         }}
       >
         {fileScanStatus && <Label
           as='a'
           color='orange'
           size='mini'
           circular
           alt='Movie has been scanned'
           className={`${styles.ThumbLabel}`}
         >
          S
        </Label>}
      </Image>
      <div
        className={`${styles.Title}`}
        title={name}
      >
        {truncate(name, 48)}
      </div>
      <div
        className={`${styles.Path}`}
        title={path.slice(0, path.lastIndexOf('/'))}
      >
        {lastModified !== undefined ? truncatePath(path.slice(0, path.lastIndexOf('/')), 40) : 'Wrong file path!'}
      </div>
      <div className={`${styles.Detail}`}>
        <div className={`${styles.DetailLeft}`}>
          {frameCountToTimeCode(frameCount, fps)}
        </div>
        <div className={`${styles.DetailRight}`}>
          {formatBytes(size, 1)}
        </div>
        <div className={`${styles.DetailCenter}`}>
          {width} x {height}
        </div>
      </div>
      <ul
        className={`${styles.SheetList}`}
      >
        {sheetsArray.map((sheetId, index) => (
          <li
            key={sheetId}
            index={index}
            data-tid={`sheetListItem_${fileId}`}
            onClick={e => onSheetClickWithStop(e, fileId, sheetId, sheetsObject[sheetId].sheetView)}
            className={`${styles.SheetListItem} ${(currentSheetId === sheetId) ? styles.SheetHighlight : ''}`}
            title={`${sheetsObject[sheetId].type} based`}
          >
            {/* {(currentSheetId === sheetId) &&
              <Label
                size='mini'
                horizontal
                className={`${styles.SheetLabel}`}
              >
              Selected sheet
            </Label>} */}
            <span className={`${styles.SheetName}`}>
                <Icon name={getSheetIcon(sheetsObject[sheetId].sheetView)} inverted />
                &nbsp;{sheetsObject[sheetId].name}
            </span>
            {/* <Input
              transparent
              fluid
              placeholder={sheetsObject[sheetId].name}
              onChange={(e, data) => {
                // e.preventDefault();
                // data.onChange.e.preventDefault();
                console.log(data);
                return undefined;
              }}
              onKeyPress={(e) => {
                // e.preventDefault();
                // data.onChange.e.preventDefault();
                console.log(e.key);
                return undefined;
              }}
              className={`${styles.SheetNameInput}`}
            /> */}
            {lastModified !== undefined &&
              <Dropdown
                data-tid='sheetItemOptionsDropdown'
                item
                direction="left"
                icon="ellipsis vertical"
                className={`${styles.overflow} ${styles.overflowHidden}`}
              >
                <Dropdown.Menu>
                    {/* <Dropdown.Item
                      data-tid='renameSheetItemOption'
                      icon="edit"
                      text="Rename"
                      onClick={e => onRenameSheetClickWithStop(e, fileId, sheetId)}
                    /> */}
                  {sheetsObject[sheetId].sheetView === SHEETVIEW.TIMELINEVIEW && <Dropdown.Item
                    data-tid='changeViewSheetToGridViewItemOption'
                    icon="grid layout"
                    text="Switch to grid view"
                    onClick={e => onChangeSheetViewClickWithStop(e, fileId, sheetId, SHEETVIEW.GRIDVIEW)}
                  />}
                  {sheetsObject[sheetId].sheetView === SHEETVIEW.GRIDVIEW && <Dropdown.Item
                    data-tid='changeViewSheetToTimelineViewItemOption'
                    icon="barcode"
                    text="Switch to timeline view"
                    onClick={e => onChangeSheetViewClickWithStop(e, fileId, sheetId, SHEETVIEW.TIMELINEVIEW)}
                  />}
                  <Dropdown.Item
                    data-tid='duplicateSheetItemOption'
                    icon="copy"
                    text="Duplicate"
                    onClick={e => onDuplicateSheetClickWithStop(e, fileId, sheetId)}
                  />
                  <Dropdown.Item
                    data-tid='exportSheetItemOption'
                    icon="download"
                    text="Export"
                    onClick={e => onExportSheetClickWithStop(e, fileId, sheetId)}
                  />
                  <Dropdown.Item
                    data-tid='deleteSheetItemOption'
                    icon="delete"
                    text="Delete"
                    onClick={e => onDeleteSheetClickWithStop(e, fileId, sheetId)}
                  />
                </Dropdown.Menu>
              </Dropdown>
            }
          </li>
        ))}
      </ul>
    </li>
  )
};

FileListElement.propTypes = {
  fileId: PropTypes.string.isRequired,
  frameCount: PropTypes.number,
  fps: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  objectUrl: PropTypes.string,
  currentFileId: PropTypes.string,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  onFileListElementClick: PropTypes.func.isRequired
};

export default FileListElement;
