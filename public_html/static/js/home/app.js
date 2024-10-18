export function clap() {
    window.alert("Thank you for your encouragement!")
}

export const navs = {
    template: `
    <menubar></menubar>
    <sidebar></sidebar>
    `,
};

export const heroSection = {
    data() {
        return {
            imagePath: `${srcURL}img/home/hero-bg.png`,
            modelPath: `${srcURL}models/desktop-computer/scene.gltf`,
        };
    },
    template: `
    <hero
      title="Welcome to"
      highlight-title="CodeYing"
      sub-title="Building Seamless Solutions<br/>Engaging User Interfaces and Software Applications"
      intro-title="Know Me More"
      intro-content="Hi, I'm <span style='color: #9C5FCA; font-weight: bold; text-decoration: underline;'>Wei-Ying Huang (William)</span>, a passionate developer with a deep interest in technology. Through this platform, I aim to share my journey, explore new concepts, and continue growing as a developer."
      :background-image="imagePath"
      :modelSrc="modelPath"
    ></hero>
    `,
};