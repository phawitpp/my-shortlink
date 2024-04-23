"use client";
import { Button, Input, Popconfirm, message, QRCode } from "antd";
import {
  CopyOutlined,
  InfoCircleTwoTone,
  PushpinTwoTone,
  SendOutlined,
} from "@ant-design/icons";
import { useState } from "react";
export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("API URL is not defined.");
    }
    if (slug == "") {
      setSlug(Math.random().toString(36).substring(2, 7));
    }
    const data = await fetch(apiUrl + "/api/link/newlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        short_link: slug,
      }),
    });
    const response = await data.json();
    if (response.status == "error") {
      messageApi.open({
        type: "error",
        content: response.message,
      });
      setConfirmLoading(false);
      setOpen(false);
      return;
    }
    setIsGenerated(true);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <main className="flex min-h-screen flex-col items-center  p-24 bg-gradient-to-r from-red-400 via-red-400 to-red-500">
      {contextHolder}
      <div className="p-3 bg-white  rounded-t-md shadow-md border-b-2 flex flex-row justify-around items-center gap-3">
        {" "}
        <PushpinTwoTone twoToneColor={"#d90036"} className="text-3xl" />
        <div className="flex flex-col">
          <span className=" text-lg font-bold text-red-500">ShortURL</span>
          <span>by phawitpp</span>
        </div>
        <div></div>
      </div>
      {!isGenerated ? (
        <div className="p-20 lg:px-36 lg: rounded-lg bg-white shadow-xl flex flex-col justify-between gap-3">
          <div className=" w-48 lg:w-80 flex flex-col gap-2">
            <span className=" font-bold">URL</span>
            <Input
              size="large"
              placeholder="Link to your URL"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </div>
          <div className=" w-48 lg:w-80 flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <span className=" font-bold">Slug</span>
              <span>(Optional)</span>
            </div>
            <Input
              size="large"
              placeholder="Slug to your URL"
              onChange={(e) => {
                setSlug(e.target.value);
              }}
            />
          </div>
          <div>
            {" "}
            <div className="flex flex-row gap-2 ">
              <InfoCircleTwoTone />
              <span>Preview URL </span>
            </div>
            <span>
              {"s.phawit.tech/" + slug}
              {slug ? "" : "randomURL"}
            </span>
          </div>
          <Popconfirm
            title="Confirm to create link?"
            description="This action cannot be undone"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
          >
            <Button
              type="primary"
              style={
                url
                  ? { backgroundColor: "#d90036", borderColor: "#d90036" }
                  : { backgroundColor: "#d4d4d4" }
              }
              shape="round"
              icon={<SendOutlined />}
              size={"large"}
              disabled={!url}
              onClick={showPopconfirm}
            >
              Create Link
            </Button>
          </Popconfirm>
        </div>
      ) : (
        <>
          <div className="p-20 lg:px-36 lg: rounded-lg bg-white shadow-xl flex flex-col justify-between gap-3">
            <div className=" w-48 lg:w-80 flex flex-col gap-2 justify-center lg:items-center">
              <QRCode value={"s.phawit.tech/" + slug} />
              <span className=" font-bold">URL</span>
              <span>{"s.phawit.tech/" + slug}</span>
              <Button
                type="primary"
                shape="round"
                icon={<CopyOutlined />}
                size="large"
                onClick={() => {
                  navigator.clipboard.writeText("s.phawit.tech/" + slug);
                  message.success("Link copied to clipboard");
                }}
                className="w-full"
              >
                Copy URL
              </Button>
              <Button
                type="default"
                shape="round"
                size="large"
                style={{ backgroundColor: "#d4d4d4", color: "#ffffff" }}
                onClick={() => {
                  setIsGenerated(false);
                  setUrl("");
                  setSlug("");
                  setOpen(false);
                }}
                className="w-full"
              >
                Back
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
