import React, { useEffect, useRef, type JSX } from "react";
import mermaid from "mermaid";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { xonokai as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'


type CodeBlockWrapperProps = React.ComponentPropsWithoutRef<"code"> & {
  code: string;
  className?: string;
};


type MermaidBlockProps = {
    code: string;
}

/**
 * 
 * @param {MermaidBlockProps} 
 * @returns {JSX.Element}
 */
const MermaidBlock = ({ code }: MermaidBlockProps): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mermaid.initialize({ startOnLoad: false });
        mermaid.render("m"+ Math.random().toString().replace(/\./g, ""), code)
        .then(({ svg }) => {
            if (ref.current) {
                ref.current.innerHTML = svg;
            }
        });
    }, [code]);

    return <div ref={ref} />; 
    
}


/**
 * Most Markdown renders do not render mermaidJS or color the code block syntax.  
 * The code blocks must be intercepted and be overwritten for them to appear as desired.
 * @param {CodeBlockWrapperProps} 
 * @returns {JSX.Element}
 */
const CodeBlockWrapper = ({ code, className, ...props }: CodeBlockWrapperProps): JSX.Element  => {
    const match = /language-(\w+)/.exec(className || '');

    if (match?.[1] === 'mermaid') {
        return <MermaidBlock code={code} />;
    } else if (match) {
        return <SyntaxHighlighter
            {...props}
            PreTag="div"
            children={code.replace(/\n$/, '')}
            language={match[1]}
            style={theme}
          />
    } else {
        return <code className={className} {...props}>{ code }</code>;
    }
}


export default CodeBlockWrapper;