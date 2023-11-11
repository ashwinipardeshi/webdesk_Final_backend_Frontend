using Microsoft.AspNetCore.Http;

namespace CommonApp
{
    public class CommonCodes
    {
        public enum APIResErrorCodes
        {
            Ok = StatusCodes.Status200OK,
            Error = StatusCodes.Status400BadRequest,
            NoContent = StatusCodes.Status204NoContent,
            Created = StatusCodes.Status201Created,
            Deleted = StatusCodes.Status404NotFound,
            Accepted = StatusCodes.Status202Accepted,
            NotFound = StatusCodes.Status404NotFound,
            AccessDenied = StatusCodes.Status403Forbidden,
            ExitsData = StatusCodes.Status208AlreadyReported,
        }
        public readonly static string Insert = "Record Saved Successfully";
        public readonly static string Update = "Record Updated Successfully";
        public readonly static string Delete = "Record Deleted Successfully";
        public readonly static string NotFound = "Record NotFound";
        public readonly static string Found = "Get All Record";
        public readonly static string Exits = "Record already exist";
        public readonly static string EmailSent = "Email Sent Successfully";
        public readonly static string AdmissionConfirm = "Admission Confirmed Successfully";
        public readonly static string AdmissionReject = "Admission Rejected Successfully";
        public readonly static string EmailExist = "Email already exists";
        public readonly static string NoContentData = "No Content";
    }
}

