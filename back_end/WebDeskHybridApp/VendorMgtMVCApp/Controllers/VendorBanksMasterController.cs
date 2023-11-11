using ClosedXML.Excel;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using VendorMgtMVCApp.Services.Contract;
using VendorMgtMVCApp.ViewModels;

namespace VendorMgtMVCApp.Controllers
{
    public class VendorBanksMasterController : Controller
    {
        private readonly IVendorBanksMaster _service;
        private readonly IVendorMasterService _vendorMasterService;
        private readonly IConfiguration _config;

        public VendorBanksMasterController(IVendorBanksMaster service, IVendorMasterService vendorMasterService, IConfiguration config)
        {
            _service = service;
            _vendorMasterService = vendorMasterService;
            _config = config;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var res = await _service.GetAll();
            return View(res);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            ViewData["VendorMasterOptions"] = new SelectList(await _vendorMasterService.GetOptions(), "Id", "Name");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(VendorBanksMasterVM vendorBanksMasterVM)
        {
            if (ModelState.IsValid)
            {
                vendorBanksMasterVM.CollegeId = 1;
                var res = await _service.Insert(vendorBanksMasterVM);
                if (res > 0)
                    ViewBag.Msg = _config.GetValue<string>("Messages:Success");
                else
                    ViewBag.Err = _config.GetValue<string>("Messages:Fail");
            }

            ViewData["VendorMasterOptions"] = new SelectList(await _vendorMasterService.GetOptions(), "Id", "Name");
            return View(vendorBanksMasterVM);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(long id)
        {
            if (id < 1)
                return NotFound();
            var res = await _service.Get(id);
            var finrest = res.FirstOrDefault();
            if (finrest == null)
            {
                return NotFound();
            }
            ViewData["VendorMasterOptions"] = new SelectList(await _vendorMasterService.GetOptions(), "Id", "Name", finrest.VendorMasterId); // Selected
            return View(finrest);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(VendorBanksMasterVM vendorBanksMasterVM)
        {
            if (ModelState.IsValid)
            {
                var res = _service.Update(vendorBanksMasterVM);
                if (res != null)
                    ViewBag.Msg = _config.GetValue<string>("Messages:Success");
                else
                    ViewBag.Err = _config.GetValue<string>("Messages:Fail");
            }
            ViewData["VendorMasterOptions"] = new SelectList(await _vendorMasterService.GetOptions(), "Id", "Name", vendorBanksMasterVM.VendorMasterId); // Selected
            return View(vendorBanksMasterVM);
        }

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

        [HttpGet]
        public async Task<IActionResult> PDFExport()
        {
            var vendorBanksdata = await _service.GetAll();
            if(vendorBanksdata != null)
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
                    preface.Add(new Phrase("Vendor Banks", fontHeader));
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

                    table.AddCell(new PdfPCell(new Phrase("Name", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Branch Name", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Account Name", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Account Type", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Account No", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("IFSC", fontTableHeader)));

                    // Font TableContent
                    BaseFont bfTableContent = BaseFont.CreateFont(
                            BaseFont.TIMES_ROMAN,
                            BaseFont.CP1252,
                            BaseFont.EMBEDDED);
                    Font fontTableContent = new Font(bfTableContent, 10, Font.UNDEFINED);

                    foreach (var data in vendorBanksdata)
                    {
                        table.AddCell(new PdfPCell(new Phrase(data.Name, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.BranchName, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.AccountName, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.AccountType, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.AccountNo, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.Ifsccode, fontTableContent)));
                    }
                    doc.Add(table);
                    doc.Close();
                    //ms.Position = 0;
                    return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "VendorBanks.pdf");
                }
            }
            else
                return View();
        }

        [HttpGet]
        public async Task<IActionResult> ExcelExport()
        {
            var vendorBanksdata = await _service.GetAll();
            if (vendorBanksdata != null)
            {
                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Vendor Banks");
                    var currentRow = 1;
                    worksheet.Cell(currentRow, 1).Value = "Name";
                    worksheet.Cell(currentRow, 2).Value = "Branch Name";
                    worksheet.Cell(currentRow, 3).Value = "Account Name";
                    worksheet.Cell(currentRow, 4).Value = "Account Type";
                    worksheet.Cell(currentRow, 5).Value = "Account No";
                    worksheet.Cell(currentRow, 6).Value = "IFSC";
                    foreach (var data in vendorBanksdata)
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = data.Name;
                        worksheet.Cell(currentRow, 2).Value = data.BranchName;
                        worksheet.Cell(currentRow, 3).Value = data.AccountName;
                        worksheet.Cell(currentRow, 4).Value = data.AccountType;
                        worksheet.Cell(currentRow, 5).Value = data.AccountNo;
                        worksheet.Cell(currentRow, 6).Value = data.Ifsccode;
                    }

                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        var content = stream.ToArray();
                        return File(
                            content,
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            "VendorBanks.xlsx");
                    }
                }
            }
            else
                return View();
        }
    }
}