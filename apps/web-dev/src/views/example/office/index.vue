<script setup lang="ts">
import { DocxViewer, ExcelViewer, PdfViewer } from '@sokach/office';
import { Card, Col, Row } from 'ant-design-vue';
</script>

<template>
  <Row :gutter="16" class="p-4">
    <Col :span="8">
      <Card title="docx">
        <DocxViewer src="/examples/word1.docx" />
      </Card>
    </Col>
    <Col :span="8">
      <Card title="excel">
        <ExcelViewer src="/examples/excel01.xlsx" style="height: 1200px" />
      </Card>
    </Col>
    <Col :span="8">
      <Card title="pdf">
        <PdfViewer src="/examples/pdf01.pdf" />
      </Card>
    </Col>
  </Row>
</template>

<style scoped></style>
