import React, { useEffect } from 'react';

const Dashboards: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        script.async = true;

        const vizElement = document.getElementById('viz1719730137868')?.getElementsByTagName('object')[0];
        if (vizElement) {
            vizElement.style.width = '1666px';
            vizElement.style.height = '918px';
            vizElement.parentNode?.insertBefore(script, vizElement);
        }

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <>
            <div className='tableauPlaceholder' id='viz1719730137868' style={{ position: 'relative' }}>
                <noscript>
                    <a href='#'>
                        <img
                            alt=' '
                            src='https://public.tableau.com/static/images/Sw/SwissHack/Cockpit/1_rss.png'
                            style={{ border: 'none' }}
                        />
                    </a>
                </noscript>
                <object className='tableauViz' style={{ display: 'none' }}>
                    <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
                    <param name='embed_code_version' value='3' />
                    <param name='site_root' value='' />
                    <param name='name' value='SwissHack&#47;Cockpit' />
                    <param name='tabs' value='yes' />
                    <param name='toolbar' value='yes' />
                    <param
                        name='static_image'
                        value='https://public.tableau.com/static/images/Sw/SwissHack/Cockpit/1.png'
                    />
                    <param name='animate_transition' value='yes' />
                    <param name='display_static_image' value='yes' />
                    <param name='display_spinner' value='yes' />
                    <param name='display_overlay' value='yes' />
                    <param name='display_count' value='yes' />
                    <param name='language' value='en-US' />
                </object>
            </div>
        </>
    );
};

export default Dashboards;
