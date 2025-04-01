export default function HomeHero() {
    return (
        <section className="home-intro px-0 py-16 xl:py-32 flex items-center justify-center w-full h-full xl:min-h-dvh overflow-hidden">
            <div className="home-intro__wrapper bg-white w-[calc(100%-2rem)] mx-auto mt-20">
                <div className="expertises-marquees">
                    <div className="expertises-marquees__expertise flex transform [transform:translate3d(-5.2055rem,0px,0px)]">
                        <div className="expertises-marquees__expertise-title-ctn">
                            <h1 data-title="PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT "
                                className="expertises-marquees__expertise-link u-text-stroke">
                                PRODUCT</h1>
                        </div>
                    </div>
                    <div className="expertises-marquees__expertise flex transform [transform:translate3d(0px,0px,0px)] justify-center">
                        <div className="expertises-marquees__expertise-title-ctn -ms-40">
                            <h1 data-title="PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH "
                                className="expertises-marquees__expertise-link u-text-stroke">
                                PITCH</h1>
                        </div>
                    </div>
                    <div className="expertises-marquees__expertise flex transform [transform:translate3d(5.2055rem,0px,0px)] justify-end">
                        <div className="expertises-marquees__expertise-title-ctn xl:-me-12">
                            <h1 data-title="PASSION PASSION PASSION PASSION PASSION PASSION PASSION PASSION PASSION PASSION PASSION "
                                className="expertises-marquees__expertise-link u-text-stroke">
                                PASSION</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}