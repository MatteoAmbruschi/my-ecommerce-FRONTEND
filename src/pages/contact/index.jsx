import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/Layout";
import FirstWrite from "@/components/firstWrite/FirstWrite";
import Title from "@/components/title/Title";

export default function Contact() {
  return (
    <>
      <Layout>
        <Title><h1>Contact<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>
        <FirstWrite 
        p1={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet nibh sit amet velit dignissim, non tempus nisl pellentesque. Praesent sagittis magna sit amet ex blandit, id pharetra lectus feugiat. Praesent sit amet congue ipsum, in ultrices neque. In dapibus in purus vitae dignissim. Quisque molestie ullamcorper elementum. Sed sodales erat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet quis lectus vitae venenatis. Aliquam erat volutpat. Nulla maximus sodales nibh dapibus congue. Integer nec pharetra felis, quis commodo elit. Fusce et aliquet neque. Vivamus leo diam, pharetra ut lorem eu, suscipit egestas ipsum. Aenean mauris ligula, laoreet ut volutpat sit amet, convallis et turpis.'} 
        p2={'Quisque molestie ullamcorper elementum. Sed sodales erat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet quis lectus vitae venenatis. Aliquam erat volutpat. Nulla maximus sodales nibh dapibus congue. Integer nec pharetra felis, quis commodo elit. Fusce et aliquet neque. Vivamus leo diam, pharetra ut lorem eu, suscipit egestas ipsum. Aenean mauris ligula, laoreet ut volutpat sit amet, convallis et turpis.'}
        />
      </Layout>
    </>
  );
}