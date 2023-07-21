//
import { trends } from "../../data/trends/mockTrends";

function formatNumber(number) {
    if (number >= 1000) {
        return (number /1000 ).toFixed(1) + "K";
    }
    return number;
}

export const TrendsCard = () => {
    
  return (
    <div className="font-roboto">
      <div className="font-bungee text-center bg-inherit glass mt-5 rounded-full shadow-lg shadow-sky-300">
        <span className="uppercase text-2xl mt-4 shadow">TRENDS</span>
        {trends.map((trend, index) => {
        return (
          <div className="py-4 font-roboto " key={index}>
            <div className="">
              <span className="text-lg">{trend.tags}</span>
            </div>
            <span className="text-xs">{formatNumber(trend.shares)} {""} shares</span>
          </div>
        );
      })}
      </div>
    </div>
  );
};
