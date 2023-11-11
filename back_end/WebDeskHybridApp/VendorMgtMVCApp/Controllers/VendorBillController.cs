using ClosedXML.Excel;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using VendorMgtMVCApp.Services.Contract;
using VendorMgtMVCApp.ViewModels;

namespace VendorMgtMVCApp.Controllers
{
    public class VendorBillController : Controller
    {
        private readonly IVendorBillService _service;
        private readonly IConfiguration _config;

        public VendorBillController(IVendorBillService service, IConfiguration config)
        {
            _service = service;
            _config = config;
        }

        #region Index
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var res = await _service.GetAll();
            return View(res);
        }
        #endregion Index

        #region Create
        [HttpGet]
        public async Task<IActionResult> Create()
        {
            ViewData["VendorMasterId"] = new SelectList(await _service.GetOptions(), "Id", "Name");
            ViewData["DebitAccountNumberId"] = new SelectList(await _service.GetAccountOptions(), "Id", "AccountNo");
            return View();
        }    

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(VendorBillVM vendorBillVM)
        {
            if (ModelState.IsValid)
            {
                vendorBillVM.CollegeId = 1;
                var res = await _service.Insert(vendorBillVM);
                if (res > 0)
                    ViewBag.Msg = _config.GetValue<string>("Messages:Success");
                else
                    ViewBag.Err = _config.GetValue<string>("Messages:Fail");
            }
            ViewData["VendorMasterId"] = new SelectList(await _service.GetOptions(), "Id", "Name");
            ViewData["DebitAccountNumberId"] = new SelectList(await _service.GetAccountOptions(), "Id", "AccountNo");
            return View(vendorBillVM);
        }
        #endregion Create

        #region Get
        [HttpGet]
        public async Task<IActionResult> Edit(long id)
        {
            if (id < 1)
                return View();
            ViewData["VendorMasterId"] = new SelectList(await _service.GetOptions(), "Id", "Name");
            ViewData["DebitAccountNumberId"] = new SelectList(await _service.GetAccountOptions(), "Id", "AccountNo");
            var res = await _service.Get(id);
            return View(res.FirstOrDefault());
        }
        #endregion Get

        #region Edit
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(VendorBillVM vendorBillVM)
        {
            if (ModelState.IsValid)
            {
                var res = await _service.Update(vendorBillVM);
                if (res != null)
                    ViewBag.Msg = _config.GetValue<string>("Messages:Success");
                else
                    ViewBag.Err = _config.GetValue<string>("Messages:Fail");
            }
            ViewData["VendorMasterId"] = new SelectList(await _service.GetOptions(), "Id", "Name");
            ViewData["DebitAccountNumberId"] = new SelectList(await _service.GetAccountOptions(), "Id", "AccountNo");
            return View(vendorBillVM);
        }

        #endregion Edit

        #region Details
        [HttpGet]
        public async Task<IActionResult> Details(long id)
        {
            if (id < 1)
                return NotFound();
            var res = await _service.Get(id);
            var finrest = res.FirstOrDefault();
            if (finrest == null)
            {
                return NotFound();
            }
            return View(finrest);
        }
        #endregion Details

        #region Delete
        [HttpGet]
        public async Task<IActionResult> Delete(long id)
        {
            if (id < 1)
                return NotFound();
            var res = await _service.Get(id);
            var finrest = res.FirstOrDefault();
            if (finrest == null)
            {
                return NotFound();
            }
            return View(finrest);
        }
        #endregion Delete

        #region ConfirmDelete
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirm(long id)
        {
            if (id < 1)
                return NotFound();
            var res = await _service.Delete(id);
            if (res.HasValue)
                return RedirectToAction(nameof(Index));
            return View();
        }
        #endregion ConfirmDelete

        #region PDF
        [HttpGet]
        public async Task<IActionResult> PDFExport()
        {
            var vendorBilldata = await _service.GetAll();
            if (vendorBilldata != null)
            {
                using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
                {
                    Document doc = new Document(iTextSharp.text.PageSize.A4.Rotate(), 30f, 30f, 30f, 30f);
                    PdfWriter writer = PdfWriter.GetInstance(doc, ms);

                    // Page No.
                    writer.PageEvent = new PdfPageEventHelper();

                    doc.Open();

                    // Font Header
                    BaseFont bfHeader = BaseFont.CreateFont(
                            BaseFont.TIMES_BOLD,
                            BaseFont.CP1252,
                            BaseFont.EMBEDDED);
                    Font fontHeader = new Font(bfHeader, 12, Font.UNDERLINE);

                    Paragraph preface = new Paragraph();
                    preface.Add(new Phrase("Vendor Bill", fontHeader));
                    preface.Alignment = Element.ALIGN_CENTER;
                    doc.Add(preface);
                    doc.Add(Chunk.NEWLINE);

                    PdfPTable table = new PdfPTable(6);

                    // Font TableHeader
                    BaseFont bfTableHeader = BaseFont.CreateFont(
                            BaseFont.TIMES_BOLD,
                            BaseFont.CP1252,
                            BaseFont.EMBEDDED);
                    Font fontTableHeader = new Font(bfTableHeader, 10, Font.UNDEFINED);

                    table.AddCell(new PdfPCell(new Phrase("Bill Number", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Inward Number", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("TAN", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Remark", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Basic Bill Amount", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Advance Amount Given", fontTableHeader)));

                    // Font TableContent
                    BaseFont bfTableContent = BaseFont.CreateFont(
                            BaseFont.TIMES_ROMAN,
                            BaseFont.CP1252,
                            BaseFont.EMBEDDED);
                    Font fontTableContent = new Font(bfTableContent, 10, Font.UNDEFINED);

                    foreach (var data in vendorBilldata)
                    {
                        table.AddCell(new PdfPCell(new Phrase(data.BillNo, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.InwardNo, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.Tan, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.Remark, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.BasicBillAmount.ToString(), fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.AdvanceAmountGiven.ToString(), fontTableContent)));
                    }
                    doc.Add(table);
                    doc.Close();
                    //ms.Position = 0;
                    return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "VendorBill.pdf");
                }
            }
            else
                return View();
        }
        #endregion PDF

        #region Excel
        [HttpGet]
        public async Task<IActionResult> ExcelExport()
        {
            var vendorBillData = await _service.GetAll();
            if (vendorBillData != null)
            {
                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Vendor Bill");
                    var currentRow = 1;
                    worksheet.Cell(currentRow, 1).Value = "Bill Number";
                    worksheet.Cell(currentRow, 2).Value = "Inward Number";
                    worksheet.Cell(currentRow, 3).Value = "Tan";
                    worksheet.Cell(currentRow, 4).Value = "Remark";
                    worksheet.Cell(currentRow, 5).Value = "Basic Bill Amount";
                    worksheet.Cell(currentRow, 6).Value = "Advance Amount Given";
                    foreach (var data in vendorBillData)
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = data.BillNo;
                        worksheet.Cell(currentRow, 2).Value = data.InwardNo;
                        worksheet.Cell(currentRow, 3).Value = data.Tan;
                        worksheet.Cell(currentRow, 4).Value = data.Remark;
                        worksheet.Cell(currentRow, 5).Value = data.BasicBillAmount;
                        worksheet.Cell(currentRow, 6).Value = data.AdvanceAmountGiven;
                    }

                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        stream.Position = 0;
                        var content = stream.ToArray();
                        return File(
                            content,
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            "VendorBill.xlsx");
                    }
                }
            }
            else
                return View();
        }
        #endregion Excel

        #region VendorMaster
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> VenderMaster(VendorMasterVM vendorMasterVM)
        {
            bool status = false;
            if (vendorMasterVM != null)
            {
                var res = await _service.Insert(vendorMasterVM);
                if (res != null)
                {
                    status = true;
                    return new JsonResult(new { status, res });
                }
            }
            return new JsonResult(new { status });
        }
        #endregion VenderMaster

        #region VendorMasterBank
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> VendorBankMaster(VendorBanksMasterVM vendorBankMasterVM)
        {
            bool status = false;
            if (vendorBankMasterVM != null)
            {
                var res = await _service.Insert(vendorBankMasterVM);
                if (res != null)
                {
                    status = true;
                    return new JsonResult(new { status, res });
                }
            }
            return new JsonResult(new { status });
        }
        #endregion VendorMasterBank
    }
}
