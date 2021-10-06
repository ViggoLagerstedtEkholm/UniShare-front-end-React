import '../../../css/footer.css';
import GitHubLogo64 from './../../../images/Github64.png';

function Footer() {
    return (
        <div>
            <div className="footer footer-content">
                <div className="logo footer-link">
                    <h4>UNISHARE</h4>
                    <a href="https://github.com/ViggoLagerstedtEkholm/UniShare-frontend-React">
                        <img src={GitHubLogo64} alt="GITHUB"/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
