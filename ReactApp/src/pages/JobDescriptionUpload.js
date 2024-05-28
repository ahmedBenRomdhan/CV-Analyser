import React, { Component } from 'react';
import axios from 'axios';
import { Table, Tag, Space, message, Button, Upload } from 'antd';
import { ToTopOutlined } from "@ant-design/icons";

export default class JobDescriptionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.fetchCVs();
  }

  fetchCVs = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Get the token from local storage
      const response = await axios.get('http://localhost:3001/jobDescription/get', {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the headers
        },
      });
      const cvs = response.data;
      console.log(cvs)

      const formattedData = cvs.map((cv, index) => ({
        key: index + 1,
        name: cv.filePath.split('/').pop(), // Assuming the file name is the last part of the filePath
        cv: <a href={`http://localhost:3001/${cv.filePath}`} target="_blank" rel="noopener noreferrer">{cv.filePath.split('/').pop()}</a>,
        
        extractedData: cv.extractedText || 'No extracted data',
        processedData: cv.processedData || 'No processed data',
        tags: ['existing'], // You can update this based on your requirements
      }));

      this.setState({ data: formattedData });
    } catch (error) {
      message.error('Error fetching CVs');
    }
  };
  handleUploadChange = info => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      
      const uploadedFilePath = info.file.response.filePath; // Assuming the response contains the file path
      console.log(uploadedFilePath)
      
      this.setState(prevState => ({
        data: [
          ...prevState.data,
          {
            key: prevState.data.length + 1,
            // name: info.file.name,
            cv: <a href={`http://localhost:3001/${uploadedFilePath}`} target="_blank" rel="noopener noreferrer">{info.file.name}</a>,
            extractedData: 'Extracted data placeholder',
            processedData: 'Processed data placeholder',
            tags: ['new'],
          }
        ]
      }));
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const token = localStorage.getItem("authToken")

    const formProps = {
      name: "file",
      action: `http://localhost:3001/jobDescription/add`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      onChange: this.handleUploadChange,
    };
    const columns = [
      // {
      //   title: 'Name',
      //   dataIndex: 'name',
      //   key: 'name',
      //   render: text => <a>{text}</a>,
      // },
      {
        title: 'CV',
        dataIndex: 'cv',
        key: 'cv',
      },
      {
        title: 'Extracted Data',
        dataIndex: 'extractedData',
        key: 'extractedData',
      },
      {
        title: 'Processed Data',
        dataIndex: 'processedData',
        key: 'processedData',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];

    return (
      <div className="container">
        
        <div style={{ marginTop: '40px' }}>
          <Table columns={columns} dataSource={this.state.data} />
        </div>
        <div style={{ marginTop: '0px' }}>
          <div className="uploadfile pb-15 shadow-none">
            <Upload {...formProps}>
              <Button
                type="dashed"
                className="ant-full-box"
                icon={<ToTopOutlined />}
              >
                Click to Upload
              </Button>
            </Upload>
          </div>
        </div>

        
      </div>
      
    );
  }
}