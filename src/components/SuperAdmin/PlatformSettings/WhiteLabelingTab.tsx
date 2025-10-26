import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { TbCloudUpload } from "react-icons/tb";
import {  message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';


// SuperaccountManagement/AllaccountsTab.tsx
interface WhiteLabel{
  id: number;
  platform: string;
  customDomain: string;
  email: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface WhiteLabelingTabProps {
  whiteLabels: WhiteLabel[];
}
// interface OptionType {
//   value: string;
//   label: string;
// }

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


export default function WhiteLabelingTab({

}: WhiteLabelingTabProps) {

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
//       const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
//       const [selectedEmail, setSelectedEmail] = useState<OptionType | null>(null);
      
//       const [emailOptions, setEmailOptions] = useState<OptionType[]>([
//     { value: "support@example.com", label: "Support Email" },
//     { value: "info@example.com", label: "Info Email" },
//     { value: "contact@example.com", label: "Contact Email" },
//   ]);

//       const [domainOptions, setDomainOptions] = useState<OptionType[]>([
//     { value: "example.com", label: "example.com" },
//     { value: "demo.net", label: "demo.net" },
//   ]);

const handleChange: UploadProps['onChange'] =(info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <TbCloudUpload size={30} style={{margin:"0 auto"}} />}
      <div style={{ marginTop: 8 }}>Upload Your File</div>
    </button>
  );


  return (
    <div className=" overflow-hidden">    

      {/* White-label Branding */}
    <form action="">
      <div className='border border-[#DFE3E8] p-6 rounded-lg '>
        <div className="headerBox mb-5">
            <h6 className='text-lg font-normal mt-1'>White-label Branding</h6>
            <p className='text-sm font-normal text-gray-500'>Access and manage all business admin dashboards</p>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-6 mb-12">
                <div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Platform Name
                        </label>
                        <input
                            type="text"
                            name="platformName"
                            placeholder="Type platform name..."
                            className="input-field w-full placeholder:text-gray-400 mb-4"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Custom Domain
                        </label>
                        <select className="input-field w-full text- mb-4">
                        <option value="" disabled selected className="text-gray-400">Select custom domain</option>
                        <option value="example.com">example.com</option>
                        <option value="demo.net">demo.net</option>
                        <option value="myapp.org">myapp.org</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Support Email
                        </label>
                        <select className="input-field w-full mb-4">
                        <option value="" disabled selected className="text-black">Select support email</option>
                        <option value="support@example.com">Support Email</option>
                        <option value="info@example.com">Info Email</option>
                        <option value="contact@example.com">Contact Email</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                            Platform Logo
                    </label>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
>
                        {imageUrl ? (
                            <img draggable={false} src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </div>
            </div>
            <hr  className="w-full border-[#C4CDD5] mb-6"/>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-[21px]">
              <div >
                  <label className="text-[16px] font-normal">Primary Colour</label>
                  <div className="flex justify-between items-center border border-[#C4CDD5] rounded-[8px] p-2 mt-4">
                    <p className="text-[14px] font-normal ">#ED990B</p>
                    <div className="w-[29px] h-[27px] bg-primary "></div>
                  </div>
              </div>
              <div >
                  <label className="text-[16px] font-normal">Secondary Colour</label>
                  <div className="flex justify-between items-center border border-[#C4CDD5] rounded-[8px] p-2  mt-4">
                    <p className={`text-[14px] font-normal`}>#000000</p>
                    <div className="w-[29px] h-[27px] bg-black "></div>
                  </div>
              </div>
              <div >
                  <label className="text-[16px] font-normal">Accent Colour</label>
                  <div className="flex justify-between items-center border border-[#C4CDD5] rounded-[8px] p-2 mt-4">
                    <p className="text-[14px] font-normal ">#C4CDD5</p>
                    <div className="w-[29px] h-[27px] bg-[#C4CDD5] "></div>
                  </div>
              </div>
            </div>
      </div>
      <div className="flex items-center gap-3 mt-[46px]">
          <button
            className="px-[28px] py-[6px] bg-primary text-white rounded hover:bg-primary-dark transition text-sm font-medium"
          >
            Save Changes
          </button>
          <button
            className="px-[28px] py-[6px] bg-[#F9DFB3] rounded transition text-sm font-medium hover:bg-[#F9E4C4]"
          >
            Reset to Default
          </button>
        </div>
    </form>
    </div>
  );
}
