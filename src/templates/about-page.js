import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

import "./pages.scss";

export const AboutPageTemplate = ({
  content,
  contentComponent,
  image,
  title,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient text-align-center">
      <div className="about-me-intro">
        <img alt="About me" src={image.publicURL} />
        <div className="content-container">
          <h2 className="headline-text">{title}</h2>
          <PageContent className="content" content={content} />
        </div>
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  image: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        image={post.frontmatter.image}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        image {
          publicURL
        }
        title
      }
    }
  }
`;
