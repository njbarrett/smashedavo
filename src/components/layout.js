import React from 'react';
import { Link } from 'gatsby';
import logo from '../../content/assets/smashed-logo.png';
import './layout.scss';

import { rhythm, scale } from '../utils/typography';

class Layout extends React.Component {
    render() {
        const { location, title, children } = this.props;
        const rootPath = `${__PATH_PREFIX__}/`;
        let header;

        if (location.pathname === rootPath) {
            header = (
                <h1
                    style={{
                        ...scale(1.5),
                        marginBottom: rhythm(1.5),
                        marginTop: 0
                    }}
                >
                    <Link
                        style={{
                            boxShadow: `none`,
                            textDecoration: `none`,
                            color: `inherit`
                        }}
                        to={`/`}
                    >
                        <img
                            src={logo}
                            alt={title}
                            style={{
                                display: 'block',
                                margin: 'auto',
                                width: 200
                            }}
                        />
                    </Link>
                </h1>
            );
        } else {
            header = null;
        }
        return (
            <div
                style={{
                    marginLeft: `auto`,
                    marginRight: `auto`,
                    maxWidth: rhythm(26),
                    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
                }}
            >
                <header>{header}</header>
                <main>{children}</main>
                <footer>
                    <small>&copy; Smashed Avo Finance {new Date().getFullYear()}.</small><br />
                    <small>Content may not be republished without permission.</small><br />
                    <small>Information provided on this website is general in nature and does not constitute financial advice.</small><br />
                    <small><a href="https://www.iubenda.com/privacy-policy/78192881" target="_blank" className="iubenda-white iubenda-embed" title="Privacy Policy ">Privacy Policy</a></small>
                </footer>
            </div>
        );
    }
}

export default Layout;
