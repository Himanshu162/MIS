import React, {useEffect, useRef, useState} from 'react';
import WebViewer from '@pdftron/webviewer';
import './App.css';
import {connect, useDispatch, useSelector} from "react-redux";
import {downloadFile,saveAnnotation,getAnnotation} from "../camunda_redux/redux/action";
import {PropTypes} from "prop-types";
import {setPassData} from "../camunda_redux/redux/ducks/passData";
import {setLoadData} from "../redux/actions/LoadingActions";
import {setSnackbar} from "../camunda_redux/redux/ducks/snackbar";
import {changingTableStateInbox} from "../camunda_redux/redux/action/apiTriggers";

const PdfViewer = (props) => {
    const viewer = useRef(null);
    const {personalID} = props;
    let annotatId = props.anottId;
    const [instance,setInstance]=useState(null);
    let [loading,setLoading] = useState(true);
    const messageReceived = useSelector(state => state.passData.messageToPassUrl);
    const dispatch = useDispatch();
    useEffect(() => {
        let flag = true;
        if(messageReceived !== "" && messageReceived != null){
            instance.setHeaderItems((header) => {
                header.pop()
            });

            instance.loadDocument(messageReceived);
            const {docViewer, annotManager} = instance;
            instance.setHeaderItems((header) => {
                header.push({
                    type: 'actionButton',
                    img: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
                    title: 'Save',
                    onClick: async() => {
                        annotManager.exportAnnotations().then((res) => {
                            const body = {"annotationData":res};
                            const val = JSON.stringify(body);
                            props.saveAnnotation(val,personalID).then(function(response) {
                                if (response.status === "OK") {
                                    // props.setReloadInboxData();
                                    flag=true;
                                    dispatch(
                                        setSnackbar(
                                            true,
                                            "success",
                                            "Annotation saved successfully"
                                        )
                                    );

                                    let trigger = false;
                                    setTimeout(() => {
                                        trigger = true;
                                        props.changingTableStateInbox(trigger, 'CHANGE_INBOX');
                                    },2000);
                                }
                                else{
                                    dispatch(
                                        setSnackbar(
                                            true,
                                            "error",
                                            "Annotation saved Failure !"
                                        )
                                    );
                                }
                            });
                            setLoading(false)
                        });
                    }
                });
            });
            // Load annotations when document is loaded

            docViewer.on('documentLoaded', function() {
                if(flag){
                    flag = false;
                    if(annotatId !== null && annotatId !== undefined && annotatId !== ""){
                    loadxfdfStrings(annotatId).then(function(rows) {
                        let xString = rows.xsdfString;
                        annotManager.importAnnotations(xString).then(response=>{
                            response.forEach(col => {
                                annotManager.importAnnotCommand(col).then(function(annotations) {
                                    annotManager.drawAnnotationsFromList(annotations);
                                });
                            })
                        });
                    });
                    }
                    annotatId="";
                }
            });
        }
        dispatch(
            setPassData("")
        )
        props.setLoadData(true);
    },[messageReceived]);

    // if using a class, equivalent of componentDidMount
    useEffect( () => {
        if(instance!=null){
            instance.loadDocument(props.fileUrl, {
                extension: 'docx'
              });
            setInstance(instance);
        }
        else{


        WebViewer(
            {
                path: `${process.env.PUBLIC_URL+'/webviewer/lib'}`,
                initialDoc: 'http://11.0.0.118:9000/template/sample.pdf'+'?token='+sessionStorage.getItem('jwt_token'),
                fullAPI: true,
                enableRedaction: true,
            },
            viewer.current,
        ).then((instance) => {
            //instance.loadDocument(props.fileUrl, { filename: 'myfile.pdf' });
            // instance.loadDocument('http://11.0.0.118:9000/7wg.hrc.hrc/111WG.ACCTS/7wg.hrc.hrc/PF001_Test/IAF/accts/1/BM/Enclosure/IAFaccts1.docx', {
            //     extension: 'docx'
            //   });
            setInstance(instance);

            const { annotManager ,docViewer, Tools } = instance;
            var FitMode = instance.FitMode;
            let data = sessionStorage.getItem("userInfo");
            // let pId = localStorage.getItem("personalID");
            let userInfo = JSON.parse(data);

            annotManager.setCurrentUser(userInfo.name);
            annotManager.setIsAdminUser(true);
            docViewer.on('documentLoaded',function(){
                instance.setFitMode(FitMode.FitWidth)
            });
            const fullScreen = {
                type: 'actionButton',
                img: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>',
                title:'FullScreen',
                onClick: () => {
                    instance.toggleFullScreen(true);
                },
                dataElement: 'fullscreen',
            };


            // Add a new button that alerts "Hello world!" when clicked
            instance.setHeaderItems((header) => {
                header.push(fullScreen)
            })

            // const displaymode=new DisplayMode(docViewer, mode, false);
            // instance.setDisplayMode((doc)=>{

            // })

        });}
    }, [props.fileUrl]);


    // Make a GET request to get XFDF string
    var loadxfdfStrings = function(documentId) {
        return props.getAnnotation(documentId)
    };

    return (
        <div  className="App">
            <div id = "pdfV" className="webviewer" ref={viewer} style={{height: "80vh"}}></div>
        </div>
    );
};

function mapStateToProps(state) {

    return { saveAnnotation: PropTypes.func.isRequired,
        getAnnotation: PropTypes.func.isRequired,
        props: state.props };
}

    export default connect(mapStateToProps,{setLoadData,downloadFile,saveAnnotation,getAnnotation, changingTableStateInbox})(PdfViewer);
