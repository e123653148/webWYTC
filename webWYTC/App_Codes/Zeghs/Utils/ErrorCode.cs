﻿namespace Zeghs.Utils {
	internal sealed class ErrorCode {
		internal const string ERROR_SYSTEM_EXCEPTION = "ERROR_SYSTEM_EXCEPTION";  //系統發生例外錯誤
		internal const string ERROR_MEMBER_USERTOKEN_EXPIRY = "ERROR_MEMBER_USERTOKEN_EXPIRY";  //會員的使用者權杖時效已經過期
		internal const string ERROR_MEMBER_USERTOKEN_ILLEGAL = "ERROR_MEMBER_USERTOKEN_ILLEGAL";  //會員的使用者權杖不合法
		internal const string ERROR_REQUEST_MISSING_PARAMETERS = "ERROR_REQUEST_MISSING_PARAMETERS";  //請求 API 缺少或遺漏必要參數
		internal const string ERROR_SQLSERVER_DELETE_FAILED = "ERROR_SQLSERVER_DELETE_FAILED";  //資料庫刪除資料失敗
		internal const string ERROR_SQLSERVER_UPDATE_FAILED = "ERROR_SQLSERVER_UPDATE_FAILED";  //資料庫新增或更新資料失敗
		internal const string WARNING_INSERT_WITHDRAWALS_BALANCE_NOTENOUGH = "WARNING_INSERT_WITHDRAWALS_BALANCE_NOTENOUGH";  //新增提現金額超出會員目前總餘額
		internal const string WARNING_LOGIN_VERIFICATION_FAILED = "WARNING_LOGIN_VERIFICATION_FAILED";  //登入驗證失敗(帳號或密碼錯誤)
		internal const string WARNING_LOTTERY_BETCOUNT_INCORRECT = "WARNING_LOTTERY_BETCOUNT_INCORRECT";  //彩票投注個數不正確(小於或高於投注玩法數量)
		internal const string WARNING_LOTTERY_BETINTERVAL_ELAPSED = "WARNING_LOTTERY_BETINTERVAL_ELAPSED";  //彩票投注時間已經過時(準備要開獎所以無法下注)
		internal const string WARNING_LOTTERY_BETPERIOD_INCORRECT = "WARNING_LOTTERY_BETPERIOD_INCORRECT";  //彩票投注期數不正確(投注期數已經過期或開獎完畢)
		internal const string WARNING_LOTTERY_BETVALUES_DUPLICATE = "WARNING_LOTTERY_BETVALUES_DUPLICATE";  //彩票投注值重複
		internal const string WARNING_LOTTERY_BETVALUE_INCORRECT = "WARNING_LOTTERY_BETVALUE_INCORRECT";  //彩票投注值不正確(與下注的玩法所要求值的不相同)
		internal const string WARNING_LOTTERY_BETVOLUME_INCORRECT = "WARNING_LOTTERY_BETVOLUME_INCORRECT";  //彩票投注數量不正確(數量包含下注金額與下注倍數)
		internal const string WARNING_LOTTERY_FORBIDDEN_SENDTICKET = "WARNING_LOTTERY_FORBIDDEN_SENDTICKET";  //目前管理端設定為禁止下單
		internal const string WARNING_LOTTERY_REMOVETICKET_FAILED = "WARNING_LOTTERY_REMOVETICKET_FAILED";  //刪除投注彩票失敗
		internal const string WARNING_LOTTERY_SENDORDER_BALANCE_NOTENOUGH = "WARNING_LOTTERY_SENDORDER_BALANCE_NOTENOUGH";  //彩票投注時會員餘額不足
		internal const string WARNING_MEMBER_ACCOUNT_LOCKED = "WARNING_MEMBER_ACCOUNT_LOCKED";  //會員帳號已被凍結
		internal const string WARNING_MODIFY_MEMBER_NOTFOUND = "WARNING_MODIFY_MEMBER_NOTFOUND";  //更新會員資料時找不到該會員註冊資料
		internal const string WARNING_PAYMENT_SCANPAY_RESOLVE_FAILED = "WARNING_PAYMENT_SCANPAY_RESOLVE_FAILED";  //第三方支付交易掃碼解析失敗
		internal const string WARNING_REGISTER_MEMBER_DUPLICATE = "WARNING_REGISTER_MEMBER_DUPLICATE";  //註冊帳號與其他會員重複
		internal const string WARNING_WITHDRAWALS_VERIFYED_NOT_REMOVE = "WARNING_WITHDRAWALS_VERIFYED_NOT_REMOVE";  //提現已經審核通過無法再撤銷刪除

		internal static readonly string SUCCESS_LOTTERY_SENDORDER_OK = string.Empty;  //彩票投注成功
	}
}