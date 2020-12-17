
//여러개( 컬렉션이 5개  select 제목, 양식, * )



db.Form.aggregate([
    {
   $lookup:
  
           {
   
            from: "Form2",
             localField: "board2_id",  
             foreignField: "board2_id", 
             as: "boardnum"  //새로 생성되는 필드명
         }
   
      },
   
      { $out : "sum2" } //두개 컬렉션합친이름
   
    ]);