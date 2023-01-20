import React from 'react';
import { Helmet } from 'react-helmet';

const DynamicMeta = ({description,title,image,url,tags}) => {
    return (

        <Helmet>
            <meta http-equiv="content-language" content="en" />
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="keywords" content={tags} />
            <meta name="author" content="Lokesh Singh Thakur" />
            <meta name="publisher" content="Lokesh Singh Thakur" />
            <meta name="copyright" content="Lokesh Singh Thakur" />
            <meta name="description" content={description} />
        
            <meta name="page-topic" content="Food Recipes" />
            <meta name="page-type" content="Food Recipes Blogs" />
            <meta name="audience" content="Everyone" />
            <meta name="robots" content="index, follow" />
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
        </Helmet>

    );
}

export default DynamicMeta;
