import React, { useEffect, useState, useLayoutEffect } from "react";
import Glide from "@glidejs/glide";
import axiosInst from "../../../util/axiosInst";
import { parseHtml } from "../../../util/helper";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosInst.get("/review/").then((result) => {
      const data = result.data.data;
      setReviews(data);
      new Glide(".glide", {
        autoplay: 3000,
        type: "carousel",
        hoverpause: false
      }).mount();
    });
  }, []);

  return (
    <section className="reviews">
      <div className="review-list">
        <div className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {reviews.map((review, index) => {
                return (
                  <li className="glide__slide" key={index}>
                    <div className="review-item">
                      <h2>WHAT OUR CLIENTS SAY</h2>

                      <h3>{review.title}</h3>
                      {parseHtml(review.content)}
                      <h4>{review.author}</h4>
                      <div className="ratings">
                        {[...Array(review.rating)].map((x, i) => (
                          <img key={i} src="./images/icons/star.svg" alt="*" />
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="glide__bullets" data-glide-el="controls[nav]">
            <button className="glide__bullet" data-glide-dir="=0" />
            <button className="glide__bullet" data-glide-dir="=1" />
            <button className="glide__bullet" data-glide-dir="=2" />
          </div>
        </div>
      </div>
    </section>
  );
}
