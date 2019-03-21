import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';
import logo from '../../content/assets/smashed-logo.png';

class JustComments extends React.Component {
    constructor(...args) {
        super(...args);
        this.ref = React.createRef();
    }
    render() {
        return (
            <div
                ref={this.ref}
                className="just-comments"
                data-apikey="61595d05-77be-42a5-9a6e-ca3513f6d192"
            />
        );
    }
    componentDidMount() {
        const s = document.createElement('script');
        s.src = '//just-comments.com/w.js';
        s.setAttribute('data-timestamp', +new Date());
        this.ref.current.appendChild(s);
    }
}

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;
        const siteTitle = this.props.data.site.siteMetadata.title;
        const { previous, next } = this.props.pageContext;

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO
                    title={post.frontmatter.title}
                    description={post.excerpt}
                />
                <div className="blog-header">
                    <Link
                        style={{
                            boxShadow: `none`,
                            textDecoration: `none`,
                            color: `inherit`,
                            width: 150,
                            flexShrink: 0,
                            marginRight: 30
                        }}
                        to={`/`}
                    >
                        <img
                            src={logo}
                            alt={post.frontmatter.title}
                            style={{
                                display: 'block',
                                margin: 'auto',
                                width: 150
                            }}
                        />
                    </Link>
                    <h1 style={{ margin: 0 }}>{post.frontmatter.title}</h1>
                </div>

                <p
                    style={{
                        ...scale(-1 / 5),
                        display: `block`,
                        marginBottom: rhythm(1),
                        marginTop: rhythm(1)
                    }}
                >
                    {post.frontmatter.date}
                </p>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <hr
                    style={{
                        marginBottom: rhythm(1)
                    }}
                />

                <ul
                    style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: 0
                    }}
                >
                    <li>
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
                <JustComments />
            </Layout>
        );
    }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
            }
        }
    }
`;
