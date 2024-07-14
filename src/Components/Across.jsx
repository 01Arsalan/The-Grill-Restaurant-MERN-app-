import "@/assets/Styles/across.css";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Backdrop } from "@mui/material";
import {MB_ACCESSTOKEN} from "../info.js"

const locationCoordinates = {
    Srinagar: [74.797371, 34.083656],
    Sopore: [74.470146, 34.298676],
    Yejbyour: [75.0996, 33.7869],
    Pulwama: [74.8946, 33.8716],
};

const Tile = ({ img, place, onClick }) => (
    <div className="across-tile">
        <img className="img" src={img} alt={place} onClick={() => onClick(place)} />
        <p className="place">{place}</p>
    </div>
);

Tile.propTypes = {
    img: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const Across = () => {
    const mapContainer = useRef(null);
    const [open, setOpen] = useState(false);
    const locationData = useSelector((state) => state.homePage.data.location);

    const handleOpen = ([long, lat]) => {
        setOpen(true);
        mapboxgl.accessToken = MB_ACCESSTOKEN;
        setTimeout(() => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [long, lat],
                zoom: 12,
            });

            new mapboxgl.Marker()
                .setLngLat([long, lat])
                .addTo(map);
        }, 0);
    };

    const handleClick = (place) => {
        handleOpen(locationCoordinates[place]);
    };

    return (
        <div className="across">
            <h2 className="across-title">Loved Across Towns</h2>
            <p className="across-launch">Now launching in over 4 towns</p>
            <h2 className="lines">
                <hr className="line" />
                <hr className="smallLine" />
                <hr className="smallLine" />
                <hr className="smallLine" />
            </h2>
            <div className="across-flags">
                {locationData.map(item => (
                    <Tile place={item.place} key={item.place} img={item.img.url} onClick={() => handleClick(item.place)} />
                ))}
            </div>
            <CustomModal open={open} setOpen={setOpen} mapContainer={mapContainer} />
        </div>
    );
};

const CustomModal = ({ open, setOpen, mapContainer }) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
        >
            <ModalContent sx={{ width: 400, padding: "8px" }}>
                <div id='map' className="mapbox-map" ref={mapContainer} style={{ height: "280px" }}></div>
            </ModalContent>
        </Modal>
    );
};

CustomModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    mapContainer: PropTypes.object.isRequired,
};

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    `,
);

export default Across;
