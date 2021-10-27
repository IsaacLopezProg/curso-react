import React from 'react';

const Info = ({info}) => {

    if(Object.keys(info).length === 0) return null;

    const {strArtistThumb, strGenre, strBiographyES} = info;

    return ( 
        <div className="card border-ligth">
            <div className="card-header bg-primary text-ligth">
                Informacion Artista
            </div>
            <div className="card-body">
                <img src={info.strArtistThumb} alt="Logo Artista" />
                <p className="card-text">Genero: {strGenre}</p>
                <p className="card-text">Biografia:</p>
                <p className="card-text">{strBiographyES}</p>
            </div>
        </div>
     );
}
 
export default Info;