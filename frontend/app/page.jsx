export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      {/* <div className="w-full max-w-2xl"> */}
        <div className="w-[1440px] h-[3388px] relative overflow-hidden bg-white">
          <img
            className="w-[1440px] h-[630px] absolute left-[-1px] top-[-1px] rounded-bl-[10px] rounded-br-[10px]"
            src="./images/solar-sky-bg.png"
          />
          <img
            className="w-[1440px] h-[630px] absolute left-[-1px] top-[-1px] rounded-bl-[10px] rounded-br-[10px]"
            src="./images/solar-sky-bg.png"
          />
          <p className="w-[717px] h-[114px] absolute left-9 top-[237px] text-5xl font-semibold text-left text-white">
            <span className="w-[717px] h-[114px] text-5xl font-semibold text-left text-white">
              Your Smart Solar Assistant &amp;
            </span>
            <br />
            <span className="w-[717px] h-[114px] text-5xl font-semibold text-left text-white">
              Local Energy Marketplace!
            </span>
          </p>
          <p className="w-[753px] h-[87px] absolute left-9 top-[370px] text-2xl text-left text-white">
            Get AI-powered solar recommendations, save money on energy bills, and earn income by sharing
            your surplus renewable energy with neighbors
          </p>
          <div className="w-[1440px] h-[470px] absolute left-0 top-[1533px] overflow-hidden bg-[#f6fafc]">
            <p className="w-[479px] h-[46px] absolute left-[480px] top-[52px] text-[37px] font-medium text-left text-[#163466]">
              How EcopowerHub Works{" "}
            </p>
            <p className="w-[74px] h-[30px] absolute left-[232.5px] top-[171px] text-2xl text-left text-[#163466]">
              Step 1
            </p>
            <p className="w-[74px] absolute left-[684px] top-[171px] text-2xl text-left text-[#163466]">
              step 2
            </p>
            <p className="w-[74px] h-[30px] absolute left-[1133.5px] top-[171px] text-2xl text-left text-[#163466]">
              step 3
            </p>
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[38px] h-[38px] absolute left-[251px] top-[122px]"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M6.33325 18.9997C6.33325 13.0285 6.33325 10.043 8.18824 8.18799C10.0432 6.33301 13.0288 6.33301 18.9999 6.33301C24.971 6.33301 27.9567 6.33301 29.8116 8.18799C31.6666 10.043 31.6666 13.0285 31.6666 18.9997C31.6666 24.9707 31.6666 27.9564 29.8116 29.8113C27.9567 31.6663 24.971 31.6663 18.9999 31.6663C13.0288 31.6663 10.0432 31.6663 8.18824 29.8113C6.33325 27.9564 6.33325 24.9707 6.33325 18.9997Z"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M11.875 23.75L14.7913 15.001C14.9408 14.5525 15.3605 14.25 15.8333 14.25C16.3061 14.25 16.7259 14.5525 16.8753 15.001L19.7917 23.75M13.4583 20.5833H18.2083"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24.5417 14.25V23.75"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.6667 3.16699V6.33366M25.3334 3.16699V6.33366M19.0001 3.16699V6.33366M12.6667 31.667V34.8337M19.0001 31.667V34.8337M25.3334 31.667V34.8337M34.8334 25.3337H31.6667M6.33341 12.667H3.16675M6.33341 25.3337H3.16675M6.33341 19.0003H3.16675M34.8334 12.667H31.6667M34.8334 19.0003H31.6667"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[38px] h-[38px] absolute left-[702px] top-[122px]"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect width={38} height={38} fill="white" />
              <path
                d="M14.25 12.667C14.25 10.0436 16.3766 7.91699 19 7.91699C21.6234 7.91699 23.75 10.0436 23.75 12.667"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M25.006 17.417H12.9938C11.4534 17.417 10.6832 17.417 10.0928 17.8399C9.5024 18.2628 9.23197 19.0082 8.6911 20.4991L7.54227 23.6658C6.48452 26.5815 5.95564 28.0393 6.64097 29.0615C7.3263 30.0837 8.83253 30.0837 11.845 30.0837H26.1548C29.1673 30.0837 30.6735 30.0837 31.3589 29.0615C32.0442 28.0393 31.5154 26.5815 30.4576 23.6658L29.3087 20.4991C28.7678 19.0082 28.4974 18.2628 27.907 17.8399C27.3165 17.417 26.5464 17.417 25.006 17.417Z"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 17.417V30.0837"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M30.0834 23.75H7.91675"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.9999 30.083V34.833M18.9999 34.833H22.1666M18.9999 34.833H15.8333"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 3.95866V3.16699"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M27.7083 12.667H28.4999"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 12.667H10.2917"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25.157 6.50805L25.7167 5.94824"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.2832 5.9502L12.843 6.51"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[38px] h-[38px] absolute left-[1152px] top-[122px]"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M34.8334 10.6872H30.4177C29.4659 10.6872 28.99 10.6872 28.5412 10.5513C28.0925 10.4154 27.6965 10.1515 26.9046 9.62349C25.7167 8.83156 24.3616 7.92814 23.6883 7.72431C23.0153 7.52051 22.3013 7.52051 20.8736 7.52051C18.9322 7.52051 17.6807 7.52051 16.8078 7.88208C15.9349 8.24365 15.2485 8.9301 13.8756 10.303L12.6674 11.5112C12.358 11.8206 12.2033 11.9753 12.1078 12.128C11.7537 12.6942 11.793 13.4217 12.2058 13.9465C12.3172 14.0881 12.4877 14.2252 12.8285 14.4996C14.0885 15.5136 15.905 15.4123 17.0459 14.2646L19.0001 12.2988H20.5834L30.0834 21.8553C30.9579 22.735 30.9579 24.1611 30.0834 25.0408C29.2089 25.9205 27.7912 25.9205 26.9167 25.0408L26.1251 24.2444M26.1251 24.2444L21.3751 19.4662M26.1251 24.2444C26.9996 25.1241 26.9996 26.5504 26.1251 27.4299C25.2506 28.3096 23.8329 28.3096 22.9584 27.4299L21.3751 25.8373M21.3751 25.8373C22.2496 26.7168 22.2496 28.1431 21.3751 29.0228C20.5006 29.9023 19.0829 29.9023 18.2084 29.0228L15.8334 26.6335M21.3751 25.8373L18.2084 22.6706M15.8334 26.6335L15.0417 25.8373M15.8334 26.6335C16.7079 27.5132 16.7079 28.9395 15.8334 29.8192C14.959 30.6987 13.5412 30.6987 12.6667 29.8192L8.196 25.2552C7.27732 24.3174 6.81798 23.8486 6.22947 23.6011C5.64096 23.3538 4.98454 23.3538 3.67174 23.3538H3.16675"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34.8333 23.3545H30.875"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M13.4584 10.6875H3.16675"
                stroke="#D2AB17"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <svg
              width={478}
              height={1}
              viewBox="0 0 478 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-[483px] top-[109px]"
              preserveAspectRatio="none"
            >
              <line y1="0.5" x2={478} y2="0.5" stroke="#163466" />
            </svg>
            <p className="w-[400px] h-[166px] absolute left-20 top-[251px] text-2xl font-light text-left text-[#163466]">
              Tell us about your home and energy needs. Our AI analyzes your location, roof size, and usage
              to recommend the perfect solar setup for You.
            </p>
            <p className="w-[400px] h-[166px] absolute left-[521px] top-[252px] text-2xl font-light text-left text-[#163466]">
              Connect with certified installers in your area. Track nearest energy surplus to buy or sell
              from peer, plant, company using a map and buy at a cheap price.
            </p>
            <p className="w-[400px] h-[166px] absolute left-[962px] top-[250px] text-2xl font-light text-left text-[#163466]">
              List your surplus energy on our marketplace. AI suggests fair prices and matches you with
              nearby buyers for seamless and profitable energy trading.
            </p>
            <div className="w-[1282px] h-[199px] absolute left-[57px] top-[676px] overflow-hidden bg-[#edf9fd]">
              <p className="w-[385px] h-[30px] absolute left-[90px] top-[21px] text-2xl font-light text-left text-[#163466]">
                What is solar energy?
              </p>
              <div className="w-6 h-6 absolute left-[66px] top-12" />
            </div>
          </div>
            <svg
              width={1368}
              height={80}
              viewBox="0 0 1368 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[1368px] h-20"
              preserveAspectRatio="none"
            >
              <path
                d="M0 20C0 8.9543 8.95431 0 20 0H1348C1359.05 0 1368 8.9543 1368 20V60C1368 71.0457 1359.05 80 1348 80H20C8.95431 80 0 71.0457 0 60V20Z"
                fill="#163466"
              />
            </svg>
          {/* <div className="w-[120px] h-[60px] absolute left-[1239px] top-[77px] overflow-hidden rounded-[10px] bg-[#d2ab17]">
            <p className="w-[89px] h-[25px] absolute left-4 top-[18px] text-2xl text-left text-black">
              SignUp
            </p>
          </div> */}
          {/* <img
            src="copilot_20251017_171457-1.png"
            className="w-[111px] h-[111px] absolute left-[37px] top-[51px] object-cover"
          /> */}
          <div className="w-[1440px] h-[889px] absolute left-0 top-[636px] overflow-hidden bg-[#edf9fd]">
            <p className="w-56 h-[46px] absolute left-9 top-[338px] text-[37px] text-left text-[#163466]">
              Our mission
            </p>
            <p className="w-[223px] h-[46px] absolute left-[736px] top-[604px] text-[37px] text-left text-[#163466]">
              What we do{" "}
            </p>
            <img
              src="./images/who_we_are.png"
              className="w-[522px] h-[254px] absolute left-[35px] top-[41px] rounded-[10px] object-cover"
            />
            <p className="w-[227.52px] h-[46px] absolute left-[736px] top-[42px] text-[37px] text-left text-[#163466]">
              Who we are{" "}
            </p>
            <p className="w-[668px] h-[115px] absolute left-[736px] top-[94px] text-lg font-light text-left text-[#163466]">
              EcoPower Hub&nbsp;is Africa's leading AI-powered renewable energy platform, revolutionizing
              how communities access, share, and benefit from clean energy solutions. We bridge the gap
              between renewable energy technology and everyday users, making&nbsp;solar
              power&nbsp;accessible, profitable, and sustainable&nbsp;for everyone.
            </p>
            <p className="w-[668px] absolute left-9 top-[390px] text-lg font-light text-left text-[#163466]">
              To democratize renewable&nbsp;energy access through AI-powered guidance and&nbsp;peer-to-peer
              energy&nbsp;trading, empowering&nbsp;communities to build a sustainable&nbsp;future while
              saving money and reducing carbon footprints.
            </p>
            <img
              src="./images/our_mission.png"
              className="w-[522px] h-[254px] absolute left-[881px] top-[307px] rounded-[10px] object-cover"
            />
            <p className="w-[668px] h-[92px] absolute left-[736px] top-[656px] text-lg font-light text-left text-[#163466]">
              EcoPower Hub uses AI to simplify solar adoption and energy trading. Get personalized solar
              advice, connect with installers, buy and sell surplus power with nearby neighbors through an
              interactive map, and track your carbon impact, all from one platform empowering cleaner,
              smarter communities.
            </p>
            <img
              src="./images/what_we_do.png"
              className="w-[522px] h-[254px] absolute left-[35px] top-[592px] rounded-[10px] object-cover"
            />
          </div>
          <svg
            width={189}
            height={2}
            viewBox="0 0 189 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[36.5px] top-[534.5px]"
            preserveAspectRatio="none"
          >
            <line y1={1} x2={189} y2={1} stroke="white" stroke-width={2} />
          </svg>
          <p className="w-[196px] h-[33px] absolute left-9 top-[503px] text-2xl text-left text-white">
            Get solar advice{" "}
          </p>
          <div className="w-[1440px] h-[916px] absolute left-0 top-[2006px] overflow-hidden bg-[#f6fafc]">
            <p className="w-[202px] h-[30px] absolute left-[65px] top-[39px] text-2xl font-light text-left text-[#d2ab17]">
              Have a Question
            </p>
            <p className="w-[479px] h-[45px] absolute left-[65px] top-[75px] text-4xl text-left text-[#163466]">
              Frequently Asked Question
            </p>
            <p className="w-[202px] h-[30px] absolute left-[65px] top-[126px] text-2xl font-light text-left text-[#163466]">
              We have Answers
            </p>
            <div className="w-[1282px] h-[199px] absolute left-[75px] top-[364px] overflow-hidden bg-[#edf9fd]">
              <p className="w-[385px] h-[30px] absolute left-[90px] top-[21px] text-2xl font-light text-left text-[#163466]">
                Why is it beneficial?
              </p>
              <p className="w-[1151px] absolute left-[90px] top-[53px] text-2xl font-light text-left text-[#163466]">
                Solar energy cuts your electricity bills, increases property value, and reduces greenhouse
                gas emissions. It also provides energy independence, letting you generate your own clean
                power and even sell the surplus for extra income.
              </p>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 absolute left-[49px] top-12"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                  stroke="#163466"
                  stroke-width="1.5"
                />
                <path
                  d="M8 10.5C8 10.5 10.946 13.5 12 13.5C13.0541 13.5 16 10.5 16 10.5"
                  stroke="#163466"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="w-[1282px] h-[199px] absolute left-[75px] top-[162px] overflow-hidden bg-[#edf9fd]">
              <p className="w-[385px] h-[30px] absolute left-[90px] top-[21px] text-2xl font-light text-left text-[#163466]">
                What is solar energy?
              </p>
              <p className="w-[1151px] absolute left-[90px] top-[53px] text-2xl font-light text-left text-[#163466]">
                Solar energy is power from the sun that’s captured using solar panels and converted into
                electricity. It’s renewable, clean, and helps reduce dependence on fossil fuels while
                lowering your carbon footprint.
              </p>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 absolute left-[25px] top-12"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z"
                  stroke="#163466"
                  stroke-width="1.5"
                />
                <path
                  d="M16 10.5C16 10.5 13.054 13.5 12 13.5C10.9459 13.5 8 10.5 8 10.5"
                  stroke="#163466"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="w-[1282px] h-[65px] absolute left-[75px] top-[566px] overflow-hidden bg-[#edf9fd]">
              <p className="w-[861px] h-[30px] absolute left-20 top-[17px] text-2xl font-light text-left text-[#163466]">
                Do I need any special permits or licenses to install solar panels in my area?
              </p>
              <svg
                width={25}
                height={25}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[25px] h-[25px] absolute left-[50px] top-5"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M12.5001 22.9163C6.74711 22.9163 2.08341 18.2526 2.08341 12.4997C2.08341 6.74671 6.74711 2.08301 12.5001 2.08301C18.253 2.08301 22.9167 6.74671 22.9167 12.4997C22.9167 18.2526 18.253 22.9163 12.5001 22.9163Z"
                  stroke="#163466"
                  stroke-width="1.5"
                />
                <path
                  d="M8.33342 14.0625C8.33342 14.0625 11.4022 10.9375 12.5001 10.9375C13.5981 10.9375 16.6667 14.0625 16.6667 14.0625"
                  stroke="#163466"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="w-[1282px] h-[65px] absolute left-[75px] top-[708px] overflow-hidden bg-[#edf9fd]">
              <p className="w-[495px] h-[27px] absolute left-[79px] top-[18px] text-2xl font-light text-left text-[#163466]">
                How do I earn money from EcoPower Hub?
              </p>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 absolute left-[25px] top-[19px]"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#163466"
                  stroke-width="1.5"
                />
                <path
                  d="M16 13.5C16 13.5 13.054 10.5 12 10.5C10.9459 10.5 8 13.5 8 13.5"
                  stroke="#163466"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="w-[1282px] h-[65px] absolute left-[75px] top-[778px] overflow-hidden bg-[#edf9fd]">
              <p className="w-[788px] h-[30px] absolute left-[77px] top-[25px] text-2xl font-light text-left text-[#163466]">
                Can it be used in winter months when the sun doesn’t shine as much?
              </p>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 absolute left-[25px] top-7"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#163466"
                  stroke-width="1.5"
                />
                <path
                  d="M16 13.5C16 13.5 13.054 10.5 12 10.5C10.9459 10.5 8 13.5 8 13.5"
                  stroke="#163466"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="w-[1282px] h-[65px] absolute left-[75px] top-[637px] overflow-hidden bg-[#edf9fd]">
              <p className="w-[646px] h-[30px] absolute left-[81px] top-[17px] text-2xl font-light text-left text-[#163466]">
                How do I buy clean energy from EcoPower Hub?
              </p>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 absolute left-[25px] top-5"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#163466"
                  stroke-width="1.5"
                />
                <path
                  d="M16 13.5C16 13.5 13.054 10.5 12 10.5C10.9459 10.5 8 13.5 8 13.5"
                  stroke="#163466"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="w-[1282px] h-[65px] absolute left-[75px] top-[2865px] overflow-hidden bg-[#edf9fd]">
            <p className="w-[1035px] h-[30px] absolute left-[84px] top-[17px] text-2xl font-light text-left text-[#163466]">
              What are the benefits of installing rooftop solar panels versus buying from EcoPower Hub?
            </p>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 absolute left-[25px] top-5"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#163466"
                stroke-width="1.5"
              />
              <path
                d="M16 13.5C16 13.5 13.054 10.5 12 10.5C10.9459 10.5 8 13.5 8 13.5"
                stroke="#163466"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>;
      {/* </div> */}
    </main>
  );
}
