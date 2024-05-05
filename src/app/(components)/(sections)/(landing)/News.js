import NewsItem from "../../elements/NewsItem";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axiosInst from "../../../util/axiosInst";
import { dateFromSqlDateTime } from "../../../util/helper";

export default function News() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    axiosInst.get("/news/latest/4/").then((result) => {
      const data = result.data.data;
      setNewsList(data);
    });
  }, []);

  return (
    <section className="news">
      <div className="dashed_news_container">
        <div className="news_content_container">
          <h2>IN THE NEWS</h2>
          <div className="news_flex_container">
            {newsList.map((item, index) => {
              return (
                <NewsItem
                  key={item.id}
                  id={item.id}
                  publisher={item.publisher}
                  headline={item.title}
                  description={item.description}
                  date={dateFromSqlDateTime(item.date)}
                />
              );
            })}
          </div>
          <Link href={"/news"}>
            <button className="button-outline-light">MORE NEWS</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
