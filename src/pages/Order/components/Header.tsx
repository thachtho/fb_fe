import { CopyOutlined, SettingOutlined } from '@ant-design/icons'

function Header() {
  const handleSetting = () => {
    alert('Đang phát triển')
  }

  const handleSave = () => {
    alert('Đang phát triển')
  }
  return (
    <div className="mt-2 flex justify-end">
      <div
        className="flex flex-col items-center justify-center"
        onClick={() => handleSetting()}
      >
        <CopyOutlined className="text-2xl" />
        <span>Đã lưu</span>
      </div>
      <div
        className="ml-3 mr-2 flex flex-col items-center justify-center"
        onClick={() => handleSave()}
      >
        <SettingOutlined className="text-2xl" />
        <span>Cài đặt</span>
      </div>
    </div>
  )
}

export default Header
