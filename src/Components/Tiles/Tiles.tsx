import Image from "next/image";

type TilesInputProp = {
  content: any;
  handleTiles: (e: any,currentIndex: number) => void;
  activatedTile: boolean;
  openedTileIndex: boolean;
  currentIndex: number;
}

export default function Tiles({ content , handleTiles , activatedTile , openedTileIndex , currentIndex } : TilesInputProp) {
  return (
    <main>
      {
        !content.isOpened ? (
          <div className={`${activatedTile ? openedTileIndex ? `bg-red-500/50` : 'bg-green-500' : `bg-gray-500`} w-[170px] rounded-md m-2 cursor-pointer`}>
            <div className="text-white text-center flex justify-center items-center h-[50px]" aria-disabled="true" onClick={() => activatedTile ? handleTiles(content, currentIndex) : undefined} >
              {content.Title}
            </div>
          </div>
        ) : (
          <div className="w-[170px] rounded-md m-2 cursor-pointer border border-1 border-blue-500">
            <div className="text-center flex justify-center items-center h-[50px]">
              <Image src={'https://e7.pngegg.com/pngimages/445/242/png-clipart-monkey-d-luffy-gomu-gomu-no-mi-one-piece-devil-fruit-paramecia-all-kinds-of-fruit-purple-violet.png'} height={40} width={40} alt="devil_fruit" />
            </div>
          </div>
        )
      }
    </main>
  );
}
