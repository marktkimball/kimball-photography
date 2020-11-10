import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import MiniHero from "../components/MiniHero";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import PortfolioImage from "../img/portfolio.jpg";
import ClearPlaceholderImage from "../img/clear_placeholder.png";

import "./pages.scss";
import "../components/portfolio.scss";

export const PortfolioPageTemplate = ({ items, subtitle, tags, title }) => {
  const [selectedTag, setSelectedTag] = useState("");
  const [lightboxImageIndex, selectLightboxImage] = useState(-1);
  console.info("ITEMS", items, items[lightboxImageIndex]);

  return (
    <>
      <MiniHero image={PortfolioImage} subtitle={subtitle} title={title} />
      <section className="section">
        <div>
          <div className="tag-container">
            <h4>Filter by type:</h4>
            <span
              className={`tag-selector ${selectedTag === "" ? "selected" : ""}`}
              onClick={() => setSelectedTag("")}
            >
              all
            </span>
            {tags.map((tag) => (
              <span
                className={`tag-selector ${
                  selectedTag === tag ? "selected" : ""
                }`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="container gallery-container">
          <div className="content" id="gallery">
            {items.map((item, i) => {
              if (!selectedTag) {
                return (
                  <div key={i} onClick={() => selectLightboxImage(i)}>
                    <PreviewCompatibleImage imageInfo={item.image} />
                  </div>
                );
              }
              if (selectedTag && item.tags.includes(selectedTag)) {
                return (
                  <div onClick={() => selectLightboxImage(i)}>
                    <PreviewCompatibleImage imageInfo={item.image} />
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div
          className={`lightbox ${
            lightboxImageIndex >= 0 ? "lightbox-open" : ""
          }`}
          id={`lightbox-${lightboxImageIndex}`}
        >
          <div className="content">
            <img
              src={
                items[lightboxImageIndex]?.image?.publicURL ||
                ClearPlaceholderImage
              }
            />
            <span
              className="close"
              onClick={() => selectLightboxImage(-1)}
            ></span>
          </div>
        </div>
      </section>
    </>
  );
};

PortfolioPageTemplate.propTypes = {
  items: PropTypes.array.isRequired,
  subtitle: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

const PortfolioPage = ({ data }) => {
  const {
    allMarkdownRemark: { group },
    markdownRemark: post,
  } = data;
  const tags = group.reduce((acc, { fieldValue }) => {
    const newTags = fieldValue.split(",");
    newTags.forEach((newTag) => {
      if (!acc.includes(newTag)) {
        acc.push(newTag);
      }
    });

    return acc;
  }, []);

  return (
    <Layout>
      <PortfolioPageTemplate
        items={post.frontmatter.items}
        subtitle={post.frontmatter.subtitle}
        tags={tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

PortfolioPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PortfolioPage;

export const PortfolioPageQuery = graphql`
  query PortfolioPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        items {
          image {
            childImageSharp {
              fluid(maxWidth: 300, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          date
          tags
        }
        title
        subtitle
      }
    }
    allMarkdownRemark(limit: 12) {
      group(field: frontmatter___items___tags) {
        fieldValue
      }
    }
  }
`;
