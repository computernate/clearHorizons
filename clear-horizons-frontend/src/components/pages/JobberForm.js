import React, {useEffect} from 'react';


const Contact = () => {
    useEffect(() => {
      // Load Jobber script dynamically
      const script = document.createElement('script');
      script.src = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';
      script.setAttribute('clienthub_id', 'c8c1a314-66db-451a-88fa-8de76f50c63b')
      script.setAttribute('form_url','https://clienthub.getjobber.com/client_hubs/c8c1a314-66db-451a-88fa-8de76f50c63b/public/work_request/embedded_work_request_form')
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        // Cleanup script on component unmount
        document.body.removeChild(script);
      };
    }, []);

    return (
        <div>
            <div id="c8c1a314-66db-451a-88fa-8de76f50c63b"></div>            
        </div>
    )
}

export default Contact;